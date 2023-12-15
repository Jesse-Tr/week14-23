import Head from "next/head";
import Link from "next/link";
import { Box, Flex, SimpleGrid, Center, Container} from "@chakra-ui/react";


export default function Layout( { children, home } ){
    return(
        <Container >
            
            <Head >
                <title >final App</title>
            </Head>
            
            <header >
                <nav>
                    <h1>Headless CMS</h1>
                </nav>
            </header>
            
            <main>
                {children}
            </main>
            
            {!home && (
                <Link href="/" className="btn btn-primary mt-3">
                    back to home
                </Link>
            )
            }
            <footer >
                <p>the footer</p>
            </footer>
            
      </Container> 
    );
}