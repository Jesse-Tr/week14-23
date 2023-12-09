import { Badge, Box, Heading, SimpleGrid, Text, useToast, } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteContact, toggleContactStatus } from "../api/contact";

const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    // tell react to update the ui!
    useEffect(() => {
        if (!user) {
            setContacts([]);
            return;
        }
        //if our code continues exctuion to here, a user is logged in
        const q = query(collection(db, "contact"), where("user", "==", user.uid));
        // since query() is async, here we set up an event handler with firebase
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
        });
    }, [user]
    );
    // build nested function too delete todo
    const handleContactDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            deleteContact(id);
            toast({ title: "Contact deleted successfully", status: "success" });
        }
    };

   /* const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleContactStatus({ docId: id, status: newStatus });
        toast({
            title: `event marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };*/
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {contacts &&
                    contacts.map((contact) => (
                        <Box key={contact.id}
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                               <a href={"/contact/"+contact.id}>{contact.name}</a> 
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleContactDelete(contact.id)}
                                >
                                    <FaTrash />
                                </Badge>
                              
                            </Heading>
                            <Text>{contact.description}</Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default ContactList;