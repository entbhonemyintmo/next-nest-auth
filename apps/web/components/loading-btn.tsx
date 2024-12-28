"use client";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const LoadingButton = ({ children }: PropsWithChildren) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			aria-disabled={pending}
			className='w-full mt-2'>
			{pending ? <Loader className='animate-spin' /> : children}
		</Button>
	);
};

export default LoadingButton;
