/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT || 5000,
	JWT_SECRET:"mysecret_tirupavai",
	NODE_ENV :"development",
	// TMDB_API_KEY:process.env.TMDB_API_KEY
	TMDB_API_KEY:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2MTdmYjU4YTI5NWQ1YjJlMWJlMjc3ZDU4MDI1NSIsIm5iZiI6MTcyNTc3NTEwOC41MjQ0NCwic3ViIjoiNjZkZDNiNmZhYWMzODU2MTYyZmUzN2I4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.nT3JHJICbt_Q-6QQOBQcfSK8Lm8TXFhdH0yOtDb72RQ"
};