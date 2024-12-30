'use server';
import { getSession } from './session';

export async function getProfile() {
    const session = await getSession({ fallback: false });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
        headers: {
            authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return response.json();
}
