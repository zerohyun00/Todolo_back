// import { Router } from "express";
// import { ImageController, upload } from "./image.controller";

// const ImageRouter = Router();

// // 이미지 생성
// ImageRouter.post("/", upload.single("avatar"), ImageController.createImage);

// export default ImageRouter;

import { Router } from "express";
import { ImageController, upload } from "./image.controller";

const imageRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: 이미지 관리 API
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: 이미지 업로드 및 생성
 *     description: 유저 아바타 이미지를 업로드하고 데이터베이스에 저장합니다.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 아바타 이미지 파일
 *               user_id:
 *                 type: string
 *                 description: 이미지를 업로드하는 유저의 ID
 *     responses:
 *       201:
 *         description: 이미지 업로드 및 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: 유저 ID
 *                 image_url:
 *                   type: string
 *                   description: 저장된 이미지 URL
 *       400:
 *         description: 이미지 파일이 없거나 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request+이미지 파일이 필요합니다."
 *       413:
 *         description: 이미지 파일 크기 초과 (5MB 초과 시)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "파일 크기는 5MB를 초과할 수 없습니다."
 */
imageRouter.post("/", upload.single("avatar"), ImageController.createImage);

export default imageRouter;
