import express from "express";
import { signup, login } from "../controllers/authController.js";

console.log("abcd", { signup, login });
const router = express.Router();
