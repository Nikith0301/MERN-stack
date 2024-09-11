import express from "express";
import {  login, logout, signup,authCheck } from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router= express.Router();

router.post("/login",login)

router.post("/logout",logout)

router.post("/signup",signup)

router.get("/authCheck",protectRoutes,authCheck)

export default router;