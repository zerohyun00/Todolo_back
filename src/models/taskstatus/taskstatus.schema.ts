import mongoose, { Schema } from 'mongoose';

const taskStatusSchema = new Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  status: {
    type: String,
    enum: ['할일', '진행중', '완료'],
    default: null,
  },
  priority: {
    type: String,
    enum: ['높음', '중간', '낮음'],
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task_Status', taskStatusSchema);
