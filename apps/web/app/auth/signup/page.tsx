import InputField from "@components/input-field";
import { Button } from "@components/ui/button";
import Link from "next/link";
import React from "react";

const Signup = () => {
	return (
		<main className='w-full h-svh flex flex-col justify-center items-center'>
			<div className='min-w-80 flex flex-col justify-center items-center p-10 rounded-lg shadow-lg dark:bg-gray-800 bg-white'>
				<h1 className='text-3xl font-bold mb-5'>Signup</h1>
				<form className='gap-6 flex flex-col'>
					<InputField
						name='email'
						label='Email'
						type='email'
					/>

					<InputField
						name='password'
						label='Password'
						type='password'
					/>

					<Button>Signup</Button>

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
