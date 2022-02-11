import React, { useEffect, useState } from "react";
import { Show, UserResponse, ShowPageInfo } from "../../types";
import { useRouter } from "next/router";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import { Box, Image, Divider, Button, FormLabel, Text } from "@chakra-ui/react";
import { toErrorMap } from "../../util/toErrorMap";
import { Formik, Form, Field } from "formik";
import { PageLayout } from "../../components/PageLayout";

const ShowPage = ({}) => {
    const [data, setData] = useState<ShowPageInfo>(undefined);
    const [currentWatched, setCurrentWatched] = useState(0);
    const router = useRouter();
    const { id } = router.query;

    let body = null;
    useEffect(() => {
        if (!id) {
            return;
        }
        const url = `http://localhost:4000/v1/show/${id}`;
        axios
            .get<ShowPageInfo>(url, {
                withCredentials: true,
            })
            .then((res) => {
                setData(res.data);
                if (res.data.inList) {
                    setCurrentWatched(res.data.userShowInfo.watched);
                }
            })
            .catch((err) => {
                router.push("/404");
            });
    }, [id]);

    if (data) {
        body = (
            <>
                <Box display="flex">
                    <Image src="/shows/Tokyo_Ghoul_main.jpg" />
                    <Box ml={4} mr={4} width="100%">
                        <Box fontWeight="semibold" fontSize="36">
                            {data.show.title}
                        </Box>
                        <Box mt={4}>
                            <Box fontWeight="semibold">Description</Box>
                            <Divider orientation="horizontal" />
                            <Box mt={2}>{data.show.description}</Box>
                        </Box>
                    </Box>
                </Box>
                <Box>Members: {data.show.times_added}</Box>
                <Box>Score: {data.show.avg_score}</Box>
                <Box>
                    <Formik
                        initialValues={{
                            watched: currentWatched,
                            rating: data.inList ? data.userShowInfo.rating : 0,
                        }}
                        onSubmit={async (
                            values,
                            { setSubmitting, setErrors }
                        ) => {
                            try {
                                const url = `http://localhost:4000/v1/show/${id}/add`;
                                const res = await axios.post<UserResponse>(
                                    url,
                                    {
                                        watched: currentWatched,
                                        rating: values.rating,
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
                        <Form>
                            <Box
                                p={2}
                                mt={2}
                                display="flex"
                                background="lightgray"
                                height="fit-content"
                                alignItems="center"
                                width="fit-content"
                            >
                                <FormLabel htmlFor="rating">Rating:</FormLabel>
                                <Field name="rating" as="select">
                                    <option value="0">-</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </Field>
                                <FormLabel htmlFor="watched" ml={2}>
                                    Watched:
                                </FormLabel>
                                <Box display="flex">
                                    <Field
                                        name="watched"
                                        type="number"
                                        value={currentWatched}
                                    />
                                    <Button
                                        ml={1}
                                        mr={1}
                                        height="6"
                                        width="4"
                                        onClick={() => {
                                            if (
                                                currentWatched + 1 >
                                                parseInt(data.show.num_eps)
                                            ) {
                                                setCurrentWatched(
                                                    parseInt(data.show.num_eps)
                                                );
                                            } else {
                                                setCurrentWatched(
                                                    currentWatched + 1
                                                );
                                            }
                                        }}
                                    >
                                        +
                                    </Button>
                                </Box>
                                <Text> / {data.show.num_eps}</Text>
                                <Button ml={2} height="6" type="submit">
                                    Add
                                </Button>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </>
        );
    } else {
        body = <>Show does not exist</>;
    }

    return (
        <>
            <PageLayout>
                <Box mt={4}>{body}</Box>
            </PageLayout>
        </>
    );
};

export default ShowPage;
