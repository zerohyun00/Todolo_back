import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image_url: { type: String, required: true, maxlength: 150 },
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const Image = model('Image', imageSchema);
