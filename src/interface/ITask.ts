import mongoose, { Document, Types } from "mongoose";

export interface ITask extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  //   crew_member?: Types.ObjectId[];
  title: string;
  content: string;
  //   author_id: Types.ObjectId;
  created_AT: Date;
  updated_AT: Date;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
}

export interface ITaskInputDTO {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  crew_member?: Types.ObjectId[];
  title: string;
  content: string;
  //   author_id: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
}
