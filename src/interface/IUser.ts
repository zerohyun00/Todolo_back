import mongoose, { Document } from "mongoose";

export interface IUser extends Document<mongoose.Types.ObjectId> {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  refreshToken?: string | null;
  created_AT: Date;
  updated_AT: Date;
  invitation_token?: string;
}

export interface IUserInputDTO {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  team?: string;
  refreshToken?: string;
  created_AT?: Date;
  updated_AT?: Date;
}

// export interface userUniqueSearchInput {
//   email: string;
// }
