# Codefolio 👨‍💻

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)

## 📝 프로젝트 소개

Codefolio는 저의 포트폴리오를 관리하는 웹사이트입니다. 개발 이력, 프로젝트, 기술 스택을 효과적으로 전시하고 관리할 수 있는 플랫폼입니다다.

## ✨ 주요 기능

- **프로젝트 관리**: 자신의 프로젝트를 등록하고 관리할 수 있습니다.
- **기술 스택 시각화**: 보유한 기술 스택을 시각적으로 표현합니다.
- **반응형 디자인**: 모바일부터 데스크탑까지 다양한 디바이스에서 최적화된 경험을 제공합니다.
- **마크다운 에디터**: 텍스트 에디터를 통해 포트폴리오 내용을 손쉽게 작성할 수 있습니다.

## 🛠️ 기술 스택

### Frontend

- React 19
- TypeScript
- React Router
- Framer Motion (애니메이션)
- TipTap (리치텍스트 에디터)

### Backend

- NestJS
- TypeORM
- PostgreSQL
- JWT 인증

## 🚀 시작하기

### 사전 요구사항

- Node.js (최신 LTS 버전)
- PostgreSQL

### 설치 방법

```bash
# 모든 패키지 설치
npm run install:all

# 개발 서버 실행
npm run dev
```

## 🌐 프로젝트 구조

```
codefolio/
├── client/             # 프론트엔드 (React)
│   ├── public/         # 정적 파일
│   └── src/            # 소스 코드
│       ├── components/ # 컴포넌트
│       ├── pages/      # 페이지
│       └── config/     # 설정 파일
│
├── server/             # 백엔드 (NestJS)
│   └── src/
│       ├── auth/       # 인증 관련
│       ├── modules/    # 모듈
│       └── config/     # 설정 파일
│
└── package.json        # 루트 패키지 설정
```
