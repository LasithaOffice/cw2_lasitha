import express from "express";
import upload from "../middleware/uploader.ts";
import { uploadFile } from "../controllers/uploadController.ts";

const uploadRoute = express.Router();

uploadRoute.post("/", upload.single("file"), uploadFile);

export default uploadRoute;
