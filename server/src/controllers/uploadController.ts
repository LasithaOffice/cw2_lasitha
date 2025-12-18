import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.ts";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "uploads",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file!.buffer);
    });
    res.status(200).json({
      message: "Uploaded successfully",
      data: (uploadResult as any).secure_url,
      success: true
    });
  } catch (error) {
    console.log("err", error)
    res.status(500).json({ message: "Upload failed", error, success: false });
  }
};
