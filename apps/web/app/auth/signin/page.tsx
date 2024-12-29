'use client';

import { signin } from '@/actions';
import { useToast } from '@/hooks/use-toast';
import InputField from '@components/input-field';
import LoadingButton from '@components/loading-btn';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const Signin = () => {
    const [status, action] = useFormState(signin, undefined);
    const { pending } = useFormStatus();
    const { toast } = useToast();

    useEffect(() => {
        if (status?.message) {
            toast({ title: 'Error', description: status.message });
        }
    }, [status?.message, pending]);

    return (
        <main className="w-full flex-1 flex flex-col justify-center items-center">
            <div className="min-w-80 flex flex-col justify-center items-center p-10 rounded-lg shadow-lg dark:bg-gray-800 bg-white">
                <h1 className="text-3xl font-bold mb-5">Sign in</h1>
                <form className="gap-6 flex flex-col" action={action}>
                    <InputField name="email" label="Email" type="email" errors={status?.error?.email} />

                    <InputField name="password" label="Password" type="password" errors={status?.error?.password} />

                    <LoadingButton>Sign in</LoadingButton>

                    <div className="inline-flex items-center justify-center gap-2">
                        <p className="text-sm">Don't have an account?</p>
                        <Link href="/auth/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Signin;
