import ImageService from "./image.service";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { User } from "../user/user.schema";

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const ImageController = {
  createImage: async (req: Request, res: Response, next: NextFunction) => {
    // 5mb넘으면 안된다고 if문 추가하기
    try {
      const filePath = req.file?.path;
      if (!filePath) {
        throw new Error("Bad Request+이미지 파일이 필요합니다.");
      }

      const image = await ImageService.createImage({
        // user_id: req.body.user_id,
        user_id: res.locals.user_id,
        imageUrl: filePath,
      });
      await User.updateOne(
        { _id: req.body.user_id },
        { $set: { avatar: image.imageUrl } }
      );
      res.status(201).send({ data: image });
    } catch (err) {
      next(err);
    }
  },
};

export { ImageController, upload };
