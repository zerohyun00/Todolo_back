import { Image } from "./image.schema";
import mongoose from "mongoose";

interface ImageData {
  user_id: string;
  image_url: string;
}

const ImageService = {
  createImage: async (data: ImageData) => {
    const image = new Image(data);
    return await image.save();
  },
};

export default ImageService;
