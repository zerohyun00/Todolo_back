import { Image } from './image.schema';
import mongoose from 'mongoose';

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

  updateImage: async (id: string, data: Partial<ImageData>) => {
    // ImageData의 둘 중 선택적으로 업데이트 가능
    return await Image.findByIdAndUpdate(id, data, { new: true }); // id와 매칭해서 이미지 업데이트 후 최신화
  },

  findImage: async (id: string) => {
    return await Image.aggregate([
      // db 순회
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // 몽고디비 oBjectId로 변환
      {
        $lookup: {
          // users와 조인
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user_info',
        },
      },
      { $unwind: '$user_info' }, // user_info 배열 추가
    ]);
  },
};

export default ImageService;
