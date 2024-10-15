import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team_id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    projectColor: { type: String },
    title: { type: String, required: true, maxlength: 150 },
  },
  { timestamps: true }
);

export const Project = model("Project", projectSchema);

/*
interface IProject 만들어야 함

기존에 있는 프로젝트에 업무를 생성 혹은 추가할 때
{
  "user_id": "6708b5cb7f38c6bde0be74c4", 
  "project_id": "605c72f9bcf86cd799439013", 
  "crew_member": ["67088061e909803a3c9e4764"], 
  "title": "아우 죽겠다 증말",
  "content": "나 진짜 죽어요",
  "startDate": "2024-10-10T10:00:00.000Z",
  "endDate": "2024-10-12T18:00:00.000Z",
  "priority": "높음",
  "status": "진행중"
}

새로운 업무 생성을 하며 새로운 프로젝트를 생성할 때
{
  "project": {
    "title": "새로운 프로젝트",
    "team_ids": ["user_id_1", "user_id_2"]
  },
  "title": "새 프로젝트의 첫 번째 업무",
  "content": "업무 내용",
  "status": "할일",
  "priority": "보통",
  "startDate": "2023-10-01",
  "endDate": "2023-10-31",
  "crew_member": ["user_id_1", "user_id_2"]
}




*/
