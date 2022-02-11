import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListInfo } from "../../../types";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Table, Thead, Th, Tbody, Td, Link, Tr } from "@chakra-ui/react";
import { PageLayout } from "../../../components/PageLayout";

const UserListPage = ({}) => {
    const [list, setList] = useState<ListInfo[]>([]);
    const router = useRouter();
    const { username } = router.query;
    useEffect(() => {
        if (!username) {
            return;
        }
        const url = `http://localhost:4000/v1/user/${username}/list`;
        axios
            .get<ListInfo[]>(url, { withCredentials: true })
            .then((res) => {
                setList(res.data);
            })
            .catch(() => {
                router.push("/404");
            });
    }, [username]);
    return (
        <>
            <PageLayout>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Title</Th>
                            <Th>Rating</Th>
                            <Th>Completion</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list.map((s, index) => {
                            return (
                                <Tr key={s.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <NextLink href={`/show/${s.id}`}>
                                            <Link>{s.title}</Link>
                                        </NextLink>
                                    </Td>
                                    <Td>{s.rating}</Td>
                                    <Td>
                                        {s.watched} / {s.num_eps}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </PageLayout>
        </>
    );
};

export default UserListPage;
