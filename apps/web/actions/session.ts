'use server';

import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { redirect } from 'next/navigation';

export type Session = {
    user: { id: number; name: string; email: string };
    accessToken: string;
    refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function getSession({ fallback = true }: { fallback?: boolean } = {}): Promise<Session | null> {
    const cookie = cookies().get('session')?.value;

    if (!cookie) {
        if (fallback) {
            redirect('/auth/signin');
        }

        return null;
    }

    try {
        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ['HS256'],
        });

        return payload as Session;
    } catch (err) {
        console.error('Failed to verify the session', err);
        redirect('/auth/sigin');
    }
}

export async function deleteSession() {
    cookies().delete('session');
    redirect('/auth/signin');
}
