import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req,res){

    try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

		if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}

		const existingUserByEmail = await User.findOne({ email: email });

		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email already exists" });
		}

		const existingUserByUsername = await User.findOne({ username: username });

		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username already exists" });
		}

		// const salt = await bcryptjs.genSalt(10);
		// const hashedPassword = await bcryptjs.hash(password, salt);

		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		const salt=await bcryptjs.genSalt(10)
		const hashedPassword=await bcryptjs.hash(password,salt)

		const newUser = new User({
			email,
			password:hashedPassword,
			username,
			image,
		});

		generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();

		res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "",
			},
		});
	}
catch(error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
}

}



export async function login(req,res){

    try{
    const {email,password}=req.body;
	if(!email ||!password){
		return res.status(500).json({success:false,message:"Enter all fields"})

	}
const user=await User.findOne({email:email})

	if(!user){
		return  res.status(500).json({success:false,message:"Check emial or password"})
	}

		const check=await bcryptjs.compare(password,user.password);

	if(!check){
		console.log("wrong pswd")
		return res.status(500).json({success:false,message:"Check emial or password"})
	}		

	const token=generateTokenAndSetCookie(user._id,res);

		res.status(200).json({success:true,
			user:{...user._doc,
					tok:token}
				})


    }
    
    catch(error){
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
    
    }
    


export async function logout(req,res){

    try{
		res.clearCookie('netflix-token', { path: '/' });

		console.log("auh controoler-logit says=",req)
		res.status(200).json({ success: true, message: "Logged out successfully" });

	} 
	catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({success:false,message:"unable to logout"})
    } 
    }

	
	export async function authCheck(req, res) {
		try {
			console.log("req.user:", req.user);
			res.status(200).json({ success: true, user: req.user });
		} catch (error) {
			console.log("Error in authCheck controller", error.message);
			res.status(500).json({ success: false, message: "Internal server error" });
		}
	}    