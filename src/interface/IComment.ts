import { Document, Types } from "mongoose";

export interface IComment extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  comment_content: string;
  created_AT?: Date;
  updated_AT?: Date;
}

export interface ICommentInputDTO {
  comment_content: string;
}
