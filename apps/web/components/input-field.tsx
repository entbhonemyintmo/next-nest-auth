import React, { HTMLInputTypeAttribute } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface InputFieldProps {
	name: string;
	label: string;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
	errors?: string[];
}

const InputField = ({ name, label, type, placeholder, errors }: InputFieldProps) => {
	return (
		<div className='w-full'>
			<Label htmlFor={name}>{label}</Label>
			<Input
				type={type}
				name={name}
				placeholder={placeholder}
				className='dark:bg-gray-600'
			/>
			<div className='flex flex-col gap-1'>
				{errors?.map((error, index) => (
					<span
						key={index}
						className='text-red-500'>
						{error}
					</span>
				))}
			</div>
		</div>
	);
};

export default InputField;
