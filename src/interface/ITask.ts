import mongoose, { Document, Types } from "mongoose";
import { IComment } from "./IComment";

export interface ITask extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  title: string;
  content: string;
  comments?: Types.DocumentArray<IComment>;
  created_AT: Date;
  updated_AT: Date;
  startDate?: Date;
  endDate?: Date;
  priority?: string;
  status?: string;
}

export interface ITaskInputDTO {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  crew_member?: Types.ObjectId[];
  title: string;
  content: string;

  startDate?: Date;
  endDate?: Date;
  priority?: string;
  status?: string;
}
