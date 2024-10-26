<a href="http://kdt-react-node-1-team02.elicecoding.com/" target="_blank">
<img src="README.asset\todolo_logo_main.png" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)

```bash
$ npm start
```

[서비스 링크](http://kdt-react-node-1-team02.elicecoding.com/)

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

- 프로젝트 이름: Todolo
- 프로젝트 설명: 팀별 일정 공유 플랫폼

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

|                            이주영                            |                            조아라                            |                            이서빈                            |                            김영현                            |                            손석경                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="README.asset\이주영.png" alt="이주영" width="150"> | <img src="README.asset\조아라.png" alt="조아라" width="150"> | <img src="README.asset\이서빈.png" alt="이서빈" width="150"> | <img src="README.asset\김영현.png" alt="김영현" width="150"> | <img src="README.asset\손석경.png" alt="손석경" width="150"> |
|                              FE                              |                              FE                              |                              FE                              |                              BE                              |                              BE                              |
|            [GitHub](https://github.com/jjyy0804)             |        [GitHub](https://kdt-gitlab.elice.io/aj02468)         |        [GitHub](https://kdt-gitlab.elice.io/rylie916)        |           [GitHub](https://github.com/zerohyun00)            |             [GitHub](https://github.com/SonSETO)             |

<br/>
<br/>

# 3. Key Features (주요 기능)

### 1. 일정 관리 기능

- 팀 및 프로젝트 기반의 일정을 생성하고 효율적으로 관리할 수 있는 기능을 제공합니다.
- 일정 항목에는 다음과 같은 정보가 포함됩니다:
  - **프로젝트**: 해당 일정이 속한 프로젝트의 이름
  - **제목**: 일정의 제목
  - **내용**: 일정의 상세 설명
  - **상태**: 할 일, 진행 중, 완료 중 하나로 설정 가능
  - **우선순위**: 높음, 중간, 낮음으로 설정 가능
  - **시작 날짜**: 일정 시작일 선택
  - **종료 날짜**: 일정 종료일 선택
  - **팀원**: 해당 일정에 참여하는 팀원 지정

### 2. 팀원 관리 기능

- 일정에 팀원을 추가하거나 제거하는 기능을 제공합니다.
  - **팀원 추가**: 서버에서 가져온 팀원 목록에서 필요한 팀원을 선택하여 일정에 추가할 수 있습니다.
  - **팀원 제거**: 일정에 배정된 팀원 목록에서 팀원을 제거할 수 있습니다.
  - **팀원 정보**: 각 팀원의 아바타와 이름이 함께 표시됩니다.

### 3. 상태 및 우선순위 관리

- 각 일정에 대해 상태 및 우선순위를 설정할 수 있는 기능을 지원합니다.
  - **상태**: 일정의 상태를 할 일, 진행 중, 완료로 설정할 수 있습니다.
  - **우선 순위**: 높음, 중간, 낮음으로 우선순위를 설정하여 일정의 중요도를 명확히 할 수 있습니다.

### 4. 소속 팀 설정

- 사용자는 이메일 인증을 통해 소속 팀을 인증하고 설정할 수 있습니다. 이를 통해 팀 단위 일정 관리가 가능합니다.

### 5. 일정 서버 동기화

- **서버와의 동기화**:
  - 서버에서 프로젝트 및 일정을 불러와 로컬 클라이언트와 동기화하여 최신 상태를 유지합니다.
  - 일정 생성, 수정, 삭제 시 서버와 즉시 동기화하여 데이터를 일관성 있게 유지할 수 있습니다.

### 6. 캘린더 일정 뷰

- 캘린더 UI를 통해 프로젝트 및 일정을 시각적으로 한눈에 확인할 수 있습니다.
- 각 일정 항목은 시각적으로 쉽게 구분될 수 있도록 색상으로 표시되며, 일정을 클릭하면 세부 정보가 포함된 모달 창이 팝업됩니다.

### 7. 회원 관리 기능

- **회원가입**: 사용자가 회원가입을 하면 데이터베이스에 유저 정보가 저장되어 관리됩니다.
- **로그인**: 등록된 사용자 정보로 로그인하여 시스템에 접근할 수 있습니다.

<br/>
<br/>

# 4. 화면 구성 📺

|                      로그인 페이지                      |                      회원가입 페이지                      |                        메인 페이지                        |
| :-----------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: |
|    <img width="200px" src="README.asset\로그인.png">    |    <img width="100px" src="README.asset\회원가입.png">    |      <img width="300px" src="README.asset\메인.png">      |
|                     팀 설정 페이지                      |                       캘린더 페이지                       |                     캘린더 상세 모달                      |
|    <img width="200px" src="README.asset\팀설정.png">    |     <img width="300px" src="README.asset\캘린더.png">     | <img width="200px" src="README.asset\캘린더상세모달.png"> |
|                     일정 추가 모달                      |                      비밀번호 재설정                      |                       내 정보 모달                        |
| <img width="300px" src="README.asset\일정추가모달.png"> | <img width="200px" src="README.asset\비밀번호재설정.png"> |   <img width="200px" src="README.asset\내정보모달.png">   |

---

# 4. Tasks & Responsibilities (작업 및 역할 분담)

|        |                                                              |                                                                                                                      |
| ------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 이주영 | <img src="README.asset\이주영.png" alt="이주영" width="100"> | <ul><li>일정 등록, 수정, 삭제</li><li>팀 리딩 및 커뮤니케이션</li><li>일정/유저 상태관리</li></ul>                   |
| 조아라 | <img src="README.asset\조아라.png" alt="조아라" width="100"> | <ul><li>로그인상태유지(프록시설정)</li><li>캘린더/ 랜딩 / 유저정보수정</li><li>비밀번호 재설정요청/ 재설정</li></ul> |
| 이서빈 | <img src="README.asset\이서빈.png" alt="이서빈" width="100"> | <ul><li>캘린더 모달, 댓글</li><li>유저정보 모달(소속 팀)</li><li>팀 정하기</li></ul>                                 |
| 김영현 | <img src="README.asset\김영현.png" alt="김영현" width="100"> | <ul><li>팀</li><li>프로젝트</li><li>업무</li></ul>                                                                   |
| 손석경 | <img src="README.asset\손석경.png" alt="손석경" width="100"> | <ul><li>유저</li><li>인증</li><li>업무</li></ul>                                                                     |

<br/>
<br/>

# 5. Technology Stack (기술 스택)

## 5.1 Frotend

| 기술 스택       | 설명                                                                 | 로고                                                                                                                        |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **React**       | 사용자 인터페이스 구축을 위한 JavaScript 라이브러리입니다.           | ![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                   |
| **TailwindCSS** | 빠르고 유연한 스타일링을 위한 유틸리티 중심의 CSS 프레임워크입니다.  | ![TailwindCSS Badge](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **TypeScript**  | JavaScript에 정적 타입을 추가하여 코드의 안정성을 높이는 언어입니다. | ![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)     |
| **Zustand**     | 전역 상태 관리를 위한 간단하고 빠른 상태 관리 라이브러리입니다.      | ![Zustand Badge](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)              |

<br/>

## 5.2 Backend

| 기술 스택      | 설명                                                                    | 로고                                                                                                                    |
| -------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Node.js**    | 서버 측 애플리케이션 개발을 위한 JavaScript 런타임입니다.               | ![Node.js Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        |
| **Express**    | Node.js 위에서 작동하는 빠르고 유연한 웹 애플리케이션 프레임워크입니다. | ![Express Badge](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)          |
| **MongoDB**    | 확장성 있고 유연한 데이터 저장을 위한 NoSQL 데이터베이스입니다.         | ![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)          |
| **TypeScript** | JavaScript에 정적 타입을 추가하여 코드의 안정성을 높이는 언어입니다.    | ![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |

<br/>

## 5.3 Cooperation

| 도구    | 로고                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| Git     | <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="Git" width="100">              |
| GitLab  | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg" alt="GitLab" width="100">     |
| Notion  | <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" width="100"> |
| Discord | <img src="https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg" alt="Discord" width="100">        |

<br/>

# 6. Project Structure (프로젝트 구조, 백엔드)

```plaintext
BACK/
├── db/                    # 데이터베이스 설정 파일
├── node_modules/          # 설치된 npm 모듈
├── README.asset           # README에 사용된 에셋 파일
├── src/
│   ├── interface/         # 타입 및 인터페이스 정의 파일
│   ├── middleware/        # 미들웨어 모듈
│   ├── models/            # 데이터베이스 모델 파일
│   ├── uploads/           # 파일 업로드 폴더
│   └── utils/             # 유틸리티 함수 모음
├── .gitignore             # Git에서 무시할 파일 및 폴더 목록
├── index.ts               # 애플리케이션 진입 파일
├── package-lock.json      # 정확한 종속성 버전 기록 파일
├── package.json           # 프로젝트 종속성 및 스크립트 정의
├── README.md              # 프로젝트 개요 및 사용법
└── tsconfig.json          # TypeScript 설정 파일
```

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)

## 브랜치 전략 (Branch Strategy)

우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- **Master Branch**
  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.
- **Dev branch**
  - 팀원 각자의 개발한 내용을 합쳐서 테스트 하는 브랜치 입니다.
  - Master 브랜치로 배포 전 최종 확인을 합니다.
- **feat{name} Branch**
  - 팀원 각자의 개발 브랜치입니다.
  - 모든 기능 개발은 이 브랜치에서 이루어집니다.

<br/>
<br/>

# 8. Coding Convention

## 문장 종료

```
// 세미콜론(;)
console.log("Hello World!");
```

<br/>

## 명명 규칙

- 변수 & 함수 : 카멜케이스

<br/>

# 9. 커밋 컨벤션

## 기본 구조

```
type : subject
```

<br/>

## type 종류

```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```

<br/>

<br/>

## 커밋 예시

```
== ex1
feat: "회원 가입 기능 구현"

== ex2
fix: "DB연결 에러 해결"
```

<br/>

## 🛠 시연 영상

[시연 영상 ](https://youtu.be/KedHE3VGAEc)
<br/>
<br/>
**출처** : [jjyy0804(팀장)](https://github.com/jjyy0804)
