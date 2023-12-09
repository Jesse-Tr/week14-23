import React from "react";
import { Box, Button, Link, SimpleGrid, Text, useColorMode, Flex,Stack} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { mode } from '@chakra-ui/theme-tools';

const Auth = (...props) => {
     const [isOpen, setIsOpen] = React.useState(false);

     const toggle = () => setIsOpen(!isOpen);
 
  
   

    return (
     <NavBarContainer {...props}>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <Login isOpen={isOpen}/>
    </NavBarContainer>
  );
};
export default Auth;

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
const Login = ({}) =>{
      // define a function to perform the login operation
      const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
        };
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth();
    return(
    <Box textAlign="right">
                <Button onClick={() => toggleColorMode()}color="gray.500">
                    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                    
                </Button>
                {" "}
                {isLoggedIn && (
                <>
                <Text color="green.500">{user.email}</Text>
                <Link color="red.500" onClick={() => auth.signOut()}>
                Logout
                </Link>
                </>
                )}
                {!isLoggedIn && (
                <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                Login with Google
                </Button>
                )}
        </Box>
    )
}

const MenuLinks = ({ isOpen }) => {
   
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      maxWidth="100vh"
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "column", "column", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem color="gray.400" to="/">Home</MenuItem>
        <MenuItem color="gray.400" to="/add-todo"> To Do </MenuItem>
        <MenuItem color="gray.400" to="/add-event"> Event </MenuItem>
        <MenuItem color="gray.400" to="/add-contact" isLast > Contacts</MenuItem>
      </Stack>
      
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
     
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      maxW="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
      
    </Flex>
    );
};
