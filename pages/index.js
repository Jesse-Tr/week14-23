import Link from "next/link";
import Layout from "../components/layout";
import { getSortedList} from "../lib/data";





// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const allData = await getSortedList();
  

  return {
    props: { allData } 
  };
}

// export our home page component Home
export default function Home( {allData} ){
  return(
    <Layout home>
      <h1>List of Names</h1>
      <div className="list-group">
        {allData.map(
        ({id,name}) =>(
          <Link key={id} href={`/${id}`} className="list-group-item list-group-action">
            {name}
            </Link>
          )
       )
      }
    </div>
    </Layout>
  );
}