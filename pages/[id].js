import Layout from "@/components/layout";
import { getAllIds, getData } from "@/lib/data";
import Link from "next/link";
import { Box, Flex, SimpleGrid, Center} from "@chakra-ui/react";





// define a getSaticsProps() function to have next.js retrieve data to use for dynamic page - this name is defined by next.js
export async function getStaticProps({params}){
       const itemData = await getData(params.id);
       
       return{
            props: {
                itemData,
               
            }
       };

}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths(){
    const paths = await getAllIds();
    return{
        paths,
        fallback: false
    };
}

 


// export our dynamically routed page component Entry
export default function Entry( {itemData} ){
    return(
       
       <Layout>
        <Box
               w='50%' 
               p={4}
               margin={1.5}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
              borderWidth='1px' borderRadius='lg' 
              
            >
      
        
            
        
         
            <div className="card-body" >
                <h5 className="card-title">{itemData.post_title}</h5>
              
                <h6 className="card-subtitle  ">post id: {itemData.ID}</h6> 
                
                <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />     
            </div>
            
        </Box>
  </Layout>  
    );
}
