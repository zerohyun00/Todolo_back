import { Image } from "./image.schema";
import mongoose from "mongoose";

interface ImageData {
  // ImageData 타입
  user_id: string;
  image_url: string;
}

const ImageService = {
  createImage: async (data: ImageData) => {
    const image = new Image(data); // 새로운 이미지 생성
    return await image.save(); // DB에 저장
  },
};

export default ImageService;
