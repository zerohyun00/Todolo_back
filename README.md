# API Documentation

## Base URL

http://localhost:3000/

---

## User Management API

### 1. **User Registration**

- **Method**: `POST`
- **URL**: `/users/register`
- **Description**: 새로운 사용자를 등록합니다. (아바타 이미지 업로드 포함)

#### 요청 헤더:

```json
Content-Type: multipart/form-data
```

#### 요청 Body 예시 (form-data):

```json

Key: avatar (Type: File, 업로드할 이미지 파일)
Key: name (Type: Text, 사용자 이름)
Key: email (Type: Text, 사용자 이메일)
Key: password (Type: Text, 비밀번호)
```

#### 응답 Body 예시:

```json
{
  "message": "사용자가 성공적으로 등록되었습니다.",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "avatar": "uploads/2024-10-10-avatar.jpg"
  }
}
```

### 2. **Confirm Team**

    •	Method: POST
    •	URL: /users/confirm-team/:token
    •	Description: 이메일로 발송된 토큰을 사용해 팀 확인을 진행합니다.

요청 헤더:

```json
Content-Type: application/json
```

응답 Body 예시:

```json
{
  "message": "팀 확인이 완료되었습니다."
}
```

### 3. **Request Password Reset**

    •	Method: POST
    •	URL: /users/request-password-reset
    •	Description: 비밀번호 재설정 이메일을 요청합니다.

요청 Body 예시:

```json
{
  "email": "johndoe@example.com"
}
```

응답 Body 예시:

```json
{
  "message": "비밀번호 재설정 링크가 이메일로 발송되었습니다."
}
```

### 4. **Reset Password**

    •	Method: POST
    •	URL: /users/reset-password/:token
    •	Description: 발송된 토큰을 사용해 비밀번호를 재설정합니다.

요청 Body 예시:

```json
{
  "password": "newPassword123"
}
```

응답 Body 예시:

```json
{
  "message": "비밀번호가 성공적으로 재설정되었습니다."
}
```

### 5. **Login**

    •	Method: POST
    •	URL: /users/login
    •	Description: 사용자 로그인

요청 Body 예시:

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

응답 Body 예시:

```json
{
  "token": "your-jwt-token"
}
```

### 6. **Logout**

    •	Method: POST
    •	URL: /users/logout
    •	Description: 사용자 로그아웃

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
```

응답 Body 예시:

```json
{
  "message": "로그아웃 되었습니다."
}
```

### 7. **Update User Information**

    •	Method: PUT
    •	URL: /users/update/:userId
    •	Description: 사용자 정보 (비밀번호, 아바타) 업데이트

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
Content-Type: multipart/form-data
```

요청 Body 예시 (form-data):

```json
Key: avatar (Type: File, 새 아바타 이미지 파일)
Key: password (Type: Text, 새 비밀번호)
Key: team (Type: Text, 팀 정보)
```

응답 Body 예시:

```json
{
  "message": "사용자 정보가 성공적으로 업데이트되었습니다."
}
```

##

## 유저 검색부분은 리펙토링 중입니다.

## Team Management API

### 1. **Get Team by ID**

    •	Method: GET
    •	URL: /teams/:id
    •	Description: 팀 ID로 팀 정보를 조회합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
```

응답 Body 예시:

```json
[
  {
    "_id": "...",
    "projects": [
      {
        "_id": "...",
        "title": "프로젝트 A",
        "created_AT": "2024-10-13T10:13:03.882Z",
        "updated_AT": "2024-10-13T10:13:03.882Z",
        "tasks": {
          "_id": "...",
          "title": "1팀의 프로젝트 A의 업무 b",
          "content": "1팀의 프로젝트 A의 업무 b",
          "created_AT": "2024-10-13T10:16:48.395Z",
          "updated_AT": "2024-10-13T10:16:48.395Z",
          "status": "진행중",
          "priority": "중간",
          "task_member_details": [
            {
              "_id": "...",
              "name": "shin",
              "email": "shin@gmail.com",
              "password": "...",
              "avatar": "N/A",
              "refreshToken": "...",
              "reset_token": null,
              "created_AT": "2024-10-13T10:00:14.250Z",
              "updated_AT": "2024-10-13T10:00:14.250Z",
              "__v": 0,
              "team_id": "..."
            }
          ],
          "comments": [
            {
              "user_id": "...",
              "comment_content": "제발 1트기원 갑니다.",
              "created_AT": "2024-10-13T14:35:33.783Z",
              "updated_AT": "2024-10-13T14:35:33.783Z",
              "_id": "..."
            }
          ]
        }
      },
      {
        "_id": "...",
        "title": "프로젝트 A",
        "created_AT": "2024-10-13T10:13:03.882Z",
        "updated_AT": "2024-10-13T10:13:03.882Z",
        "tasks": {
          "_id": "...",
          "title": "1팀의 프로젝트 A의 업무 C",
          "content": "1팀의 프로젝트 A의 업무 C",
          "created_AT": "2024-10-13T10:17:13.014Z",
          "updated_AT": "2024-10-13T10:17:13.014Z",
          "status": "진행중",
          "priority": "높음",
          "task_member_details": [
            {
              "_id": "...",
              "name": "shin",
              "email": "shin@gmail.com",
              "password": "...",
              "avatar": "N/A",
              "refreshToken": "...",
              "reset_token": null,
              "created_AT": "2024-10-13T10:00:14.250Z",
              "updated_AT": "2024-10-13T10:00:14.250Z",
              "__v": 0,
              "team_id": "..."
            }
          ],
          "comments": []
        }
      },
      {
        "_id": "...",
        "title": "프로젝트 B",
        "created_AT": "2024-10-13T10:13:09.984Z",
        "updated_AT": "2024-10-13T10:13:09.984Z",
        "tasks": {
          "task_member_details": []
        }
      }
    ]
  }
]
```

## Task Management API

### 1. **Create Task**

    •	Method: POST
    •	URL: /tasks
    •	Description: 새로운 업무를 생성합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

요청 Body 예시:

```json
{
  "project_id": "...",
  "title": "새로운 업무",
  "content": "업무의 설명입니다.",
  "start_date": "2024-10-10",
  "end_date": "2024-10-15",
  "priority": "높음",
  "status": "진행중",
  "task_member": ["..."],
  "comments": ["..."]
}
```

응답 Body 예시:

```json
{
  "message": "업무가 성공적으로 생성되었습니다.",
  "task": {
    "_id": "...",
    "title": "새로운 업무",
    "content": "업무의 설명입니다.",
    "start_date": "2024-10-10",
    "end_date": "2024-10-15",
    "priority": "높음",
    "status": "진행중",
    "task_member": ["..."],
    "comments": ["..."]
  }
}
```

### 2. **Update Task**

    •	Method: PUT
    •	URL: /tasks/:taskId
    •	Description: 특정 업무를 수정합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

요청 Body 예시:

```json
{
  "title": "업데이트된 업무 제목",
  "content": "업무 내용이 업데이트되었습니다.",
  "start_date": "2024-10-12",
  "end_date": "2024-10-20",
  "priority": "중간",
  "status": "완료",
  "task_member": ["..."],
  "comments": ["..."]
}
```

응답 Body 예시:

```json
{
  "message": "업무가 성공적으로 수정되었습니다.",
  "task": {
    "_id": "...",
    "title": "업데이트된 업무 제목",
    "content": "업무 내용이 업데이트되었습니다.",
    "start_date": "2024-10-12",
    "end_date": "2024-10-20",
    "priority": "중간",
    "status": "완료",
    "comments": ["..."]
  }
}
```

### 3. **Delete Task**

    •	Method: DELETE
    •	URL: /tasks/:taskId
    •	Description: 특정 업무를 삭제합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
```

응답 Body 예시:

```json
{
  "message": "업무가 성공적으로 삭제되었습니다."
}
```

### 4. **Add Comment to Task**

    •	Method: POST
    •	URL: /tasks/:taskId/comments
    •	Description: 특정 업무에 댓글을 추가합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

요청 Body 예시:

```json
{
  "comment_content": "이것은 새로운 댓글입니다."
}
```

응답 Body 예시:

```json
{
  "message": "댓글이 성공적으로 추가되었습니다."
}
```

### 5. **Update Comment**

    •	Method: PUT
    •	URL: /tasks/:taskId/comments/:commentId
    •	Description: 특정 댓글을 수정합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

요청 Body 예시:

```json
{
  "comment_content": "업데이트된 댓글 내용"
}
```

응답 Body 예시:

```json
{
  "message": "댓글이 성공적으로 수정되었습니다."
}
```

### 6. **Delete Comment**

    •	Method: DELETE
    •	URL: /tasks/:taskId/comments/:commentId
    •	Description: 특정 댓글을 삭제합니다.

요청 헤더:

```json
Authorization: Bearer {your_jwt_token}
```

응답 Body 예시:

```json
{
  "message": "댓글이 성공적으로 삭제되었습니다."
}
```
