import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// export const useAuthStore = create((set) => ({
// 	user: null,
// 	isSigningUp: false,
// 	isCheckingAuth: true,
// 	isLoggingOut: false,
// 	isLoggingIn: false,
// 	signup: async (credentials) => {
// 		set({ isSigningUp: true });
// 		try {
// 			const response = await axios.post("/api/v1/auth/signup", credentials);
// 			set({ user: response.data.user, isSigningUp: false });
// 			toast.success("Account created successfully");
// 		} catch (error) {
// 			toast.error(error.response.data.message || "Signup failed");
// 			set({ isSigningUp: false, user: null });
// 		}
// 	},
// 	login: async (credentials) => {
// 		set({ isLoggingIn: true });
// 		try {
// 			const response = await axios.post("/api/v1/auth/login", credentials);
// 			set({ user: response.data.user, isLoggingIn: false });
// 		} catch (error) {
// 			set({ isLoggingIn: false, user: null });
// 			toast.error(error.response.data.message || "Login failed");
// 		}
// 	},
// 	logout: async () => {
// 		set({ isLoggingOut: true });
// 		try {
// 			await axios.post("/api/v1/auth/logout");
// 			set({ user: null, isLoggingOut: false });
// 			toast.success("Logged out successfully");
// 		} catch (error) {
// 			set({ isLoggingOut: false });
// 			toast.error(error.response.data.message || "Logout failed");
// 		}
// 	},
// 	authCheck: async () => {
// 		set({ isCheckingAuth: true });
// 		try {
// 			const response = await axios.get("/api/v1/auth/authCheck");

// 			set({ user: response.data.user, isCheckingAuth: false });
// 		} catch (error) {
// 			set({ isCheckingAuth: false, user: null });
// 			// toast.error(error.response.data.message || "An error occurred");
// 		}
// 	},
// }));

const theUrl="https://netflix-backend-34oy.onrender.com"
// const theUrl="http://localhost:5000"

export const useAuthStore=create((set)=>({

    user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,

   signup:async (credentials)=>{
    set({isSigningUp:true})
    console.log(credentials)
try {
    console.log(credentials)
    const response=await  axios.post(`${theUrl}/api/v1/auth/signup`,credentials)

    set({user:response.data.user,isSigningUp:false});
    toast.success("Account created successfully");
} catch (error) {
    toast.error(error.response.data.message || "Signup failed");
    set({ isSigningUp: false, user: null });
}
    
   },

   login: async(credentials)=>{

    set({isLoggingIn:true})

    try {
        console.log(credentials)
        const response=await  axios.post(`${theUrl}/api/v1/auth/login`,credentials)

        console.log(response.data.user.tok)
        const token=response.data.user.tok;
        document.cookie = `netflix-token=${token}; path=/; max-age=${15 * 24 * 60 * 60}; SameSite=Lax`;
        set({user: response.data.user,isLoggingIn:false})

      
    } catch (error) {
        set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
    }
   },

   logout:async()=>{

    set({isLoggingOut:true})
    try {
        console.log("Before",document.cookie);
        // Clear cookie by setting it with an expired date
document.cookie = "netflix-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
console.log("After",document.cookie);
       axios.post(`${theUrl}/api/v1/auth/logout`,{withCredentials: true});

        set({user:null,isLoggingOut:false})
        toast.success("Logged out successfully");

    } catch (error) {
        
        set({isLoggingOut:true})
        toast.error(error.response.data.message||"Unable to logout")
    }


   },



   authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
        const response = await axios.get(`${theUrl}/api/v1/auth/authCheck`,
            {
                // Ensure withCredentials is true to send cookies with the request
                withCredentials: true
            });

        set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
        console.log(error.message)
        set({ isCheckingAuth: false, user: null });
        toast.error(error.response.data.message || "An error occurredin authCheck");
    }
},
}))