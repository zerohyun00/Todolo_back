import { Image } from "./image.schema";
import mongoose from "mongoose";

interface ImageData {
  user_id: string;
  imageUrl: string;
}

const ImageService = {
  createImage: async (data: ImageData) => {
    const image = new Image(data);
    return await image.save();
  },
};

export default ImageService;
