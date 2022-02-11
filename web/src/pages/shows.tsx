import React, { useEffect, useState } from "react";
import axios from "axios";
import NextLink from "next/link";
import { Show } from "../types";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { PageLayout } from "../components/PageLayout";

interface showsProps {}

const Shows: React.FC<showsProps> = ({}) => {
    const [shows, setShows] = useState<Show[]>([]);
    useEffect(() => {
        axios
            .get<Show[]>("http://localhost:4000/v1/show/all", {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data) {
                    setShows(res.data);
                }
            });
    }, []);

    return (
        <>
            <PageLayout>
                <Table variant="simple">
                    <Thead>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Score</Th>
                        <Th>Members</Th>
                    </Thead>
                    <Tbody>
                        {shows.map((s, index) => {
                            return (
                                <Tr key={s.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <NextLink href={`/show/${s.id}`}>
                                            <Link>{s.title}</Link>
                                        </NextLink>
                                    </Td>
                                    <Td>{s.avg_score}</Td>
                                    <Td>{s.times_added}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </PageLayout>
        </>
    );
};

export default Shows;
