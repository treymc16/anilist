import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { NavBar } from "../../components/NavBar";
import { User } from "../../types";
import { Link } from "@chakra-ui/react";
import axios from "axios";
import { PageLayout } from "../../components/PageLayout";

const UserPage = ({}) => {
    const router = useRouter();
    const { username } = router.query;
    const [user, setUser] = useState<User>(undefined);

    useEffect(() => {
        if (!username) {
            return;
        }
        const url = `http://localhost:4000/v1/user/${username}`;
        axios
            .get<User>(url, { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                router.push("/404");
            });
    }, [username]);

    return (
        <>
            <PageLayout>
                <div>{username}</div>
                <NextLink href={`/user/${username}/list`}>
                    <Link>Anime List</Link>
                </NextLink>
            </PageLayout>
        </>
    );
};

export default UserPage;
