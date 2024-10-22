import mongoose, { Document, Types } from "mongoose";
import { IComment } from "./IComment";

export interface ITask extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  projectTitle?: string;
  title: string;
  content: string;
  comments?: Types.DocumentArray<IComment>;
  createdAt: Date;
  updatedAt: Date;
  projectColor: string;
  startDate?: Date;
  endDate?: Date;
  priority?: string;
  status?: string;
  taskMember?: Types.ObjectId[];
}

export interface ITaskInputDTO {
  team_id?: any;
  projectTitle?: any;
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  title: string;
  content: string;
  projectColor: string;
  startDate?: Date;
  endDate?: Date;
  priority?: string;
  status?: string;
  taskMember?: Types.ObjectId[];

  comments?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
