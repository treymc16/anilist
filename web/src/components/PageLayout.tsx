import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";

interface PageLayoutProps {}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <>
            <Box w="95%" mx="auto">
                <NavBar />
                {children}
            </Box>
        </>
    );
};
