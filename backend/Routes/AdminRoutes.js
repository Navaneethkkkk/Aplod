import express from "express";
import {Login} from "../Controller/Admincontroller.js"


const adminRoutes = express.Router();

adminRoutes.post("/login",Login)


export default adminRoutes;