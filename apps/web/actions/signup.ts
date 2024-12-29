'use server';

import { FormState, SingupSchema } from '@/lib/types';
import { redirect } from 'next/navigation';

export default async function signup(formState: FormState, formData: FormData): Promise<FormState> {
    const result = SingupSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
    });

    const data = await response.json();

    if (response.ok) {
        redirect('/auth/signin');
    } else {
        return { message: response.status === 409 ? 'User already exists!' : response.statusText };
    }
}
