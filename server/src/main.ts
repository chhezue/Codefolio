import "tsconfig-paths/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@config/config.service";
import { Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

// 더미 프로젝트 데이터 생성
const dummyProjects = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    description:
      "개인 포트폴리오를 위한 반응형 웹사이트입니다. 프로젝트 경험과 기술 스택을 효과적으로 보여주기 위해 설계했습니다.",
    role: "풀스택 개발자",
    periodStart: new Date("2023-01-01"),
    periodEnd: new Date("2023-03-15"),
    stack: ["React", "TypeScript", "NestJS", "TailwindCSS"],
    pin: true,
    features: [
      {
        title: "반응형 디자인",
        description:
          "모든 디바이스에서 최적화된 사용자 경험을 제공하는 반응형 레이아웃",
        imageUrl: "https://via.placeholder.com/800x600?text=반응형+디자인",
      },
      {
        title: "프로젝트 관리 시스템",
        description:
          "프로젝트를 쉽게 추가, 수정, 삭제할 수 있는 관리자 인터페이스",
        imageUrl: "https://via.placeholder.com/800x600?text=프로젝트+관리",
      },
    ],
    techChallenges: [
      {
        title: "이미지 최적화",
        description:
          "다양한 디바이스에서 빠른 로딩 시간을 위한 이미지 최적화 전략 구현",
      },
      {
        title: "SEO 최적화",
        description:
          "검색 엔진 최적화를 위한 메타데이터 및 시맨틱 HTML 구조 설계",
      },
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=메인+화면",
        description: "포트폴리오 메인 화면",
      },
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=프로젝트+상세",
        description: "프로젝트 상세 페이지",
      },
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/username/portfolio",
      },
      {
        type: "DOC",
        title: "기술 문서",
        icon: "fas fa-file-alt",
        link: "https://docs.example.com/portfolio",
      },
    ],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-03-15"),
  },
  {
    id: "2",
    title: "쇼핑몰 플랫폼",
    description:
      "사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 온라인 쇼핑몰 플랫폼입니다.",
    role: "백엔드 개발자",
    periodStart: new Date("2022-06-01"),
    periodEnd: new Date("2022-12-20"),
    stack: ["Node.js", "Express", "MongoDB", "Redis", "AWS"],
    pin: true,
    features: [
      {
        title: "실시간 재고 관리",
        description:
          "Redis를 활용한 실시간 재고 관리 시스템으로 재고 정확도 향상",
        imageUrl: "https://via.placeholder.com/800x600?text=재고+관리",
      },
      {
        title: "안전한 결제 시스템",
        description: "PG사 연동 및 보안 강화로 안전한 결제 프로세스 구현",
        imageUrl: "https://via.placeholder.com/800x600?text=결제+시스템",
      },
    ],
    techChallenges: [
      {
        title: "대용량 트래픽 처리",
        description:
          "프로모션 기간 동안의 대용량 트래픽을 처리하기 위한 서버 확장성 설계",
      },
      {
        title: "데이터베이스 최적화",
        description: "쿼리 성능 향상을 위한 인덱싱 전략 및 캐싱 레이어 구현",
      },
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=상품+목록",
        description: "상품 목록 페이지",
      },
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=결제+페이지",
        description: "결제 프로세스 화면",
      },
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/username/ecommerce",
      },
      {
        type: "STATS",
        title: "성능 분석",
        icon: "fas fa-chart-line",
        link: "https://analytics.example.com/ecommerce",
      },
    ],
    createdAt: new Date("2022-06-01"),
    updatedAt: new Date("2022-12-20"),
  },
  {
    id: "3",
    title: "AI 기반 일정 관리 앱",
    description:
      "사용자의 습관과 선호도를 학습하여 최적의 일정을 추천해주는 AI 기반 일정 관리 애플리케이션입니다.",
    role: "프론트엔드 개발자",
    periodStart: new Date("2023-04-01"),
    periodEnd: new Date("2023-08-30"),
    stack: ["React Native", "Redux", "TensorFlow.js", "Firebase"],
    pin: false,
    features: [
      {
        title: "AI 일정 추천",
        description:
          "사용자 패턴을 분석하여 최적의 일정 시간을 추천하는 AI 알고리즘",
        imageUrl: "https://via.placeholder.com/800x600?text=AI+추천",
      },
      {
        title: "크로스 플랫폼 지원",
        description:
          "iOS와 Android에서 동일한 사용자 경험을 제공하는 크로스 플랫폼 설계",
        imageUrl: "https://via.placeholder.com/800x600?text=크로스+플랫폼",
      },
    ],
    techChallenges: [
      {
        title: "오프라인 모드 구현",
        description:
          "네트워크 연결 없이도 앱 기능을 사용할 수 있는 오프라인 모드 구현",
      },
      {
        title: "디바이스 최적화",
        description:
          "다양한 디바이스에서 일관된 성능을 보장하기 위한 최적화 작업",
      },
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=메인+대시보드",
        description: "일정 관리 대시보드",
      },
      {
        imageUrl: "https://via.placeholder.com/1200x800?text=AI+추천+화면",
        description: "AI 추천 인터페이스",
      },
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/username/ai-scheduler",
      },
      {
        type: "DOC",
        title: "API 문서",
        icon: "fas fa-file-code",
        link: "https://api.example.com/scheduler",
      },
    ],
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-08-30"),
  },
];

// 애플리케이션 진입점
async function bootstrap() {
  const logger = new Logger("Bootstrap");
  logger.log("🔧 애플리케이션을 초기화하는 중...");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // CORS 설정 수정
  app.enableCors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  // 환경 정보 로깅
  const nodeEnv = configService.get("NODE_ENV", "development");
  const PORT = configService.port;

  // uploads 폴더 정적으로 제공
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });

  // 더미 데이터 API 엔드포인트 추가
  app.use("/api/projects", (req, res) => {
    res.json({
      items: dummyProjects,
      total: dummyProjects.length,
      totalPages: 1,
    });
  });

  app.use("/api/projects/:id", (req, res) => {
    const project = dummyProjects.find((p) => p.id === req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "프로젝트를 찾을 수 없습니다." });
    }
  });

  app.use("/api/pinned-projects", (req, res) => {
    const pinnedProjects = dummyProjects.filter((p) => p.pin);
    res.json({
      items: pinnedProjects,
      total: pinnedProjects.length,
    });
  });

  await app.listen(PORT);

  logger.log(`🚀 서버가 시작되었습니다!`);
  logger.log(`🌐 URL: http://localhost:${PORT}`);
  logger.log(`🔧 환경: ${nodeEnv}`);

  if (configService.isDevelopment) {
    logger.log("🛠️ 개발 모드로 실행 중입니다.");
  } else if (configService.isProduction) {
    logger.log("🏭 프로덕션 모드로 실행 중입니다.");
  }
}

bootstrap().catch((err) => {
  const logger = new Logger("Bootstrap");
  logger.error(`❌ 애플리케이션 시작 중 오류가 발생했습니다: ${err.message}`);
  process.exit(1);
});
