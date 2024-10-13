import { Router } from "express";
import { ImageController, upload } from "./image.controller";

const ImageRouter = Router();

// 이미지 생성
ImageRouter.post("/", upload.single("avatar"), ImageController.createImage);
// 이미지 수정
ImageRouter.put("/:id", upload.single("avatar"), ImageController.updateImage);
// 이미지 조회
ImageRouter.get("/:id", ImageController.findImage);

export default ImageRouter;
