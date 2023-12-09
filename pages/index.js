import { Box, Container, Divider, Flex, HStack, VStack, Text, Heading, SimpleGrid, } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList"; 
import React from "react"


export default function Home(props) {
    return (


   

        <Box mt={5}>
        <SimpleGrid>
        <Auth /> 
        <TodoList />
        <EventList />
        <ContactList />
       
      </SimpleGrid> </Box>








    )
};
