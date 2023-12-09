import React from "react";
import {Box,Input,Button,Textarea,Stack,Select,useToast,} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addContact } from "../api/contact";

const AddContact = () => {
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleContactCreate = async () => {
    if (!isLoggedIn) {
        toast({
            title: "You must be logged in to create a contact",
            status: "error",
            duration: 9000,
            isClosable: true,
            });
        return;
        }
    setIsLoading(true);
        const contact = {
        name,
        phone,
        status,
        userId: user.uid,
    };
    await addContact(contact);
    setIsLoading(false);
    setName("");
    setPhone("");
    setStatus("pending");
    toast({ title: "contact created successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">
        <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Input
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
        
        <Button
        onClick={() => handleContactCreate()}
        disabled={name.length < 1 || phone.length < 1 || isLoading}
        colorScheme="teal"
        variant="solid"
        >
        Add
        </Button>
        </Stack>
        </Box>
    );
};
export default AddContact;