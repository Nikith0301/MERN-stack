import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import { protectRoutes } from "./middleware/protectRoutes.js";
import tvRoutes from "./routes/tv.routes.js"
import searchRoutes from "./routes/search.routes.js"
import path from "path";
const app = express();
app.use(cors({
	origin: 'http://localhost:5173', // Your frontend URL
	credentials: true, // Allow cookies to be sent and received
  }))


const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie",protectRoutes,movieRoutes)
app.use("/api/v1/tv",protectRoutes,tvRoutes)
app.use("/api/v1/search",protectRoutes,searchRoutes)


if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(5000, () => {
	console.log("Server garted at http://localhost:" + PORT);
    connectDB();
});