import mongoose, { Document } from "mongoose";

export interface IUser extends Document<mongoose.Types.ObjectId> {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  team_id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string | null;
  invitationToken?: string;
  resetToken?: string;
}

export interface IUserInputDTO {
  name?: string;
  email: string;
  password: string;
  team_id?: mongoose.Types.ObjectId;
  avatar?: string;
  team?: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}

// export interface userUniqueSearchInput {
//   email: string;
// }
