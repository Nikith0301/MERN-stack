import axios from "axios"

export default function Test() {


	// const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2MTdmYjU4YTI5NWQ1YjJlMWJlMjc3ZDU4MDI1NSIsIm5iZiI6MTcyNTc3NTg2Ni44MDYyMTksInN1YiI6IjY2ZGQzYjZmYWFjMzg1NjE2MmZlMzdiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wHR67uVRtDtirOrEpoQ-SIFF6mK5TeYYNKcFgf6oOYQ";

  

    async function myFun(){
        // try {
        //     const res = await axios.get(
        //         `http://localhost:5000/api/v1/tv/trending`, 
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         }
               
        //     );
        //     console.log(res.data);



        // }
        try{
            const res = await axios.get(
                `http://localhost:5000/api/v1/auth/authCheck`,
                {
                    // Ensure withCredentials is true to send cookies with the request
                    withCredentials: true
                }
            );
            console.log(res.data);
        }
        
        
        catch (err) {
            console.error("Error fetching trending content:", err);
        }
    }
  return (
    <>
    <button onClick={myFun}>Butt</button>
    </>
  )
}
