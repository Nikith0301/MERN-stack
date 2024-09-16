import jwt from "jsonwebtoken"

import {ENV_VARS} from "../config/envVars.js"

export const generateTokenAndSetCookie=(userId,res)=>{


    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"3d"})

    // res.cookie("netflix-token",token,{
    //     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
	// 	httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
	// 	sameSite: "strict", // CSRF attacks cross-site request forgery attacks
	// 	secure: ENV_VARS.NODE_ENV !== "development",
    // })

    res.cookie("netflix-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
        httpOnly: true, // prevent access via JS
        secure: ENV_VARS.NODE_ENV === "production",
        sameSite: "None", // This ensures cross-origin cookies are sent

        //before it was something else
    });
    
    // console.log("generate token function made this-:",token)
return token

}