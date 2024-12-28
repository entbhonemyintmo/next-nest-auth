"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

export type Session = {
	user: { id: number; name: string; email: string };
};

export async function createSession(payload: Session) {
	const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const secretKey = process.env.SESSION_SECRET_KEY!;
	const encodedKey = new TextEncoder().encode(secretKey);

	const session = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);

	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiredAt,
		sameSite: "lax",
		path: "/",
	});
}
