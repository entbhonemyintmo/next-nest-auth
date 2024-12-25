import React, { HTMLInputTypeAttribute } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface InputFieldProps {
	name: string;
	label: string;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
}

const InputField = ({ name, label, type, placeholder }: InputFieldProps) => {
	return (
		<div className='w-full'>
			<Label htmlFor={name}>{label}</Label>
			<Input
				type={type}
				name={name}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputField;
