import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import { UserResponse } from "../types";
import axios from "axios";
import { toErrorMap } from "../util/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "", email: "" }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        const res = await axios.post<UserResponse>(
                            "http://localhost:4000/v1/login",
                            {
                                username: values.username,
                                password: values.password,
                            },
                            { withCredentials: true }
                        );
                        setSubmitting(false);
                        if (!res.data.errors) {
                            router.push("/");
                        } else {
                            setErrors(toErrorMap(res.data.errors));
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box mt={4}>
                            <InputField
                                name="username"
                                placeholder="username"
                                label="Username"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting}>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Login;
