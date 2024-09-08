import express from "express";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import { protectRoutes } from "./middleware/protectRoutes.js";
import tvRoutes from "./routes/tv.routes.js"
import searchRoutes from "./routes/search.routes.js"
const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie",protectRoutes,movieRoutes)
app.use("api/v1/tv",protectRoutes,tvRoutes)
app.use("api/v1/search",protectRoutes,searchRoutes)

app.listen(5000, () => {
	console.log("Server garted at http://localhost:" + PORT);
    connectDB();
});