import { Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";

export default function AddContacts() {
return (
<Container maxW="7xl">
<Auth />
<AddContact />
</Container>
);
} 