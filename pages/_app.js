//bring in bootstrap css files with responsive csss media queries
import '../styles/bootstrap.min.css';
import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react"

//define our next.js master MyApp
function MyApp( {Component,pageProps} ){
  return(
    <ChakraProvider>
     <Component {...pageProps} />
     </ChakraProvider>
  )
}

export default MyApp;