import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true, maxlength: 150 },
  },
  { timestamps: true }
);

export const Image = model("Image", imageSchema);
