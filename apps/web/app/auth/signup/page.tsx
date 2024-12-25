"use client";

import signup from "@/actions/signup";
import { useToast } from "@/hooks/use-toast";
import InputField from "@components/input-field";
import { Button } from "@components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Signup = () => {
	const [status, action] = useFormState(signup, undefined);
	const { pending } = useFormStatus();
	const { toast } = useToast();

	useEffect(() => {
		if (status?.message) {
			toast({ title: "Error", description: status.message });
		}
	}, [status?.message, pending]);

	return (
		<main className='w-full h-svh flex flex-col justify-center items-center'>
			<div className='min-w-80 flex flex-col justify-center items-center p-10 rounded-lg shadow-lg dark:bg-gray-800 bg-white'>
				<h1 className='text-3xl font-bold mb-5'>Signup</h1>
				<form
					className='gap-6 flex flex-col'
					action={action}>
					<InputField
						name='name'
						label='Name'
						type='name'
						errors={status?.error?.name}
					/>

					<InputField
						name='email'
						label='Email'
						type='email'
						errors={status?.error?.email}
					/>

					<InputField
						name='password'
						label='Password'
						type='password'
						errors={status?.error?.password}
					/>

					<Button type='submit'>{pending ? <Loader className='animate-spin' /> : "Singup"}</Button>

					<div className='inline-flex items-center gap-2'>
						<p className='text-sm'>Already have an account?</p>
						<Link
							href='/auth/signin'
							className='underline'>
							Signin
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Signup;
