import { useEffect, useState } from "react"

import {useContentStore} from "../store/content.js"
import axios from "axios";



const useGetTrendingContent = () => {
    const [trendingContent,setTrendingContent]=useState();
    const{contentType}=useContentStore();
    useEffect(()=>{
        const getTrendingContent=async()=>{

          try {


            const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/trending`,
              {
                  // Ensure withCredentials is true to send cookies with the request
                  withCredentials: true
              });
            setTrendingContent(res.data.content);




        } 
        // const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2MTdmYjU4YTI5NWQ1YjJlMWJlMjc3ZDU4MDI1NSIsIm5iZiI6MTcyNTc3NTg2Ni44MDYyMTksInN1YiI6IjY2ZGQzYjZmYWFjMzg1NjE2MmZlMzdiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wHR67uVRtDtirOrEpoQ-SIFF6mK5TeYYNKcFgf6oOYQ";
        // try {
          
        //   const res = await axios.get(
        //     `https://api.themoviedb.org/3/trending/movie/day?language=en-US`, 
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`
        //       }
        //     }
        //   );
        //   console.log(res.data);
        //   setTrendingContent(res.data.content);
        // } 
        
        catch (err) {
          console.error("Error fetching trending content:", err.message);
        }


        }

        getTrendingContent();
    },[contentType])

  return {trendingContent}
}

export default useGetTrendingContent