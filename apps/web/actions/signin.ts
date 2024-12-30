'use server';

import { FormState, SigninSchema } from '@/lib/types';
import { redirect } from 'next/navigation';
import { createSession } from './session';

export async function signin(formState: FormState, formData: FormData) {
    const result = SigninSchema.safeParse({ email: formData.get('email'), password: formData.get('password') });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
    });

    if (response.ok) {
        const data = await response.json();

        await createSession({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        });

        redirect('/dashboard');
    } else {
        return { message: response.status === 401 ? 'Invalid credentials!' : response.statusText };
    }
}
