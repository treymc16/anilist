import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
