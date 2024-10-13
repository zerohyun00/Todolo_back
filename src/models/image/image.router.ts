import { Router } from "express";
import { ImageController, upload } from "./image.controller";

const ImageRouter = Router();

// 이미지 생성
ImageRouter.post("/", upload.single("avatar"), ImageController.createImage);

export default ImageRouter;
