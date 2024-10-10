import { Schema, model } from 'mongoose';

const calendarviewSchema = new Schema({
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  calendar_date: { type: Date, required: true },
  created_AT: { type: Date, default: Date.now },
  updated_AT: { type: Date, default: Date.now },
});

export const CalendarView = model('CalendarView', calendarviewSchema);
