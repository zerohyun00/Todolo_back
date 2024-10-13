import ImageService from './image.service';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { User } from '../user/user.schema';

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
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
      const filePath = req.file?.path; // 이미지 파일을 uploads에 저장
      if (!filePath) {
        throw new Error('Bad Request+이미지 파일이 필요합니다.');
      }

      const image = await ImageService.createImage({
        // 이미지 경로랑 userID 디비에 저장
        user_id: req.body.user_id,
        image_url: filePath,
      });
      await User.updateOne({ _id: req.body.user_id }, { $set: { avatar: image.image_url } });
      res.status(201).json(image); // json형식으로 응답
    } catch (err) {
      next(err);
    }
  },

  updateImage: async (req: Request, res: Response, next: NextFunction) => {
    // 이미지 수정
    try {
      const { id } = req.params; // 이미지 id
      const updatedImage = await ImageService.updateImage(id, req.body); // 해당 이미지를 업데이트
      res.status(200).json(updatedImage);
    } catch (err) {
      next(err);
    }
  },
  findImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // 이미지 id
      const image = await ImageService.findImage(id); // db에서 id로 해당 이미지 조회
      res.status(200).json(image); // json으로 응답
    } catch (err) {
      next(err);
    }
  },
};

export { ImageController, upload };
