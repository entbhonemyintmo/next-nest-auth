import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './actions/session';

export default async function middleware(req: NextRequest) {
    const session = await getSession({ fallback: false });

    if (!session || !session.user) return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));

    NextResponse.next();
}

export const config = { matcher: ['/me', '/dashboard'] };
