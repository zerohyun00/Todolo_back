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

  start_date?: Date;
  end_date?: Date;
  priority?: string;
  status?: string;
  task_member?: Types.ObjectId[];
}

export interface ITaskInputDTO {
  team_id: any;
  project_title: any;
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  title: string;
  content: string;

  start_date?: Date;
  end_date?: Date;
  priority?: string;
  status?: string;
  task_member?: Types.ObjectId[];

  comments?: any[];
}
