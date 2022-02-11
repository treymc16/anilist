import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link, Button, Box, Text, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { UserResponse } from "../types";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        axios
            .get<UserResponse>("http://localhost:4000/v1/me", {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user);
            });
    }, []);

    let body = null;

    if (user) {
        body = (
            <>
                <NextLink href="/">
                    <Link mr={2}>Home</Link>
                </NextLink>
                <NextLink href="/shows">
                    <Link mr={2}>Shows</Link>
                </NextLink>
                <NextLink href={`/user/${user.username}`}>
                    <Link mr={2}>Profile</Link>
                </NextLink>
                <Button
                    onClick={() => {
                        axios
                            .get("http://localhost:4000/v1/logout", {
                                withCredentials: true,
                            })
                            .then(() => {
                                router.reload();
                            });
                    }}
                    variant="link"
                >
                    Logout
                </Button>
            </>
        );
    } else {
        body = (
            <>
                <NextLink href="/">
                    <Link mr={2}>Home</Link>
                </NextLink>
                <NextLink href="/shows">
                    <Link mr={2}>Shows</Link>
                </NextLink>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        );
    }

    return (
        <>
            
            <Box mt={2} p={2} bg="lightblue" display="flex">
			<Text fontWeight="bold"
            >
                Anilist
            </Text>
			<Spacer />
                {body}
            </Box>
        </>
    );
};
