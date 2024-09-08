import { fetchfromTMDB } from "../services/tmdb.service.js";



export async function getTrendingMovie(req,res){

    try {
        console.log("going to fetch")
     const data= await fetchfromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
     const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)]
    
     res.json({ success: true, content: randomMovie });
    }
     catch (error) {
        res.status(500).json({ success: false,  message: "Internal Controller Error" });
    }
 }

export async function getMovieTrailers(req,res){
const  {id}=req.params
try {
    const data=await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.status(200).json({success:true,trailers:data.results})
 
} 
catch (error) {

    if(error.message.includes("404")){
        return res.status(404).send(null);
    }
    res.status(500).json({success:false,message:"tmdb controller error"})
}
    
}


export async function getMovieDetails(req,res){
    const {id}=req.params

    try {
        const data=await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({ success: true, content: data });

    } catch (error) {
        if(error.message.contains("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "tmdb Details controller Error" });
    }
}



export async function getSimilarMovies(req, res) {
}

export async function getMoviesByCategory(req, res) {
}

export async function getLatestMovie(){

   try {
    const data= await fetchfromTMDB('https://api.themoviedb.org/3/movie/latest')
   } catch (error) {
    
   }
}

