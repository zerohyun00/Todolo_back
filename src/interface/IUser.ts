import mongoose, { Document } from "mongoose";

export interface IUser extends Document<mongoose.Types.ObjectId> {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_AT: Date;
  updated_AT: Date;
  refreshToken?: string | null;
  invitation_token?: string;
  reset_token?: string;
}

export interface IUserInputDTO {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  team?: string;
  created_AT?: Date;
  updated_AT?: Date;
  refreshToken?: string;
}

// export interface userUniqueSearchInput {
//   email: string;
// }
