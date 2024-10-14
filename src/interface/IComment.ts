import { Document, Types } from "mongoose";

export interface IComment extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  commentContent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentInputDTO {
  commentContent: string;
  createdAt?: Date;
  updatedAt?: Date;
}
