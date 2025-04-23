import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProjectFeatures from "../components/project/ProjectFeatures";
import PageLayout from "../components/layout/PageLayout";
import { Project } from "../components/project/ProjectCard";
import DeleteProjectModal from "../components/project/DeleteProjectModal";

// 더미 프로젝트 상세 데이터
const dummyProjectDetails: Record<string | number, Project> = {
  "1": {
    id: "1",
    title: "포트폴리오 웹사이트",
    description: "React와 Tailwind CSS를 사용하여 개발한 개인 포트폴리오 웹사이트입니다. 사용자가 직관적으로 프로젝트를 탐색할 수 있도록 설계했으며, 반응형 디자인으로 모든 기기에서 최적의 경험을 제공합니다.",
    role: "풀스택 개발자",
    stack: ["React", "TypeScript", "Tailwind CSS", "Express.js"],
    periodStart: new Date("2023-01-01"),
    periodEnd: new Date("2023-02-15"),
    features: [
      {
        title: "반응형 디자인",
        description: "모든 디바이스에서 최적화된 사용자 경험을 제공하는 반응형 레이아웃",
        imageUrl: "https://via.placeholder.com/800x500/3b82f6/FFFFFF?text=Responsive+Design"
      },
      {
        title: "다크 모드",
        description: "사용자 선호도에 따라 전환 가능한 라이트/다크 테마 지원",
        imageUrl: "https://via.placeholder.com/800x500/3b82f6/FFFFFF?text=Dark+Mode"
      }
    ],
    techChallenges: [
      {
        title: "성능 최적화",
        description: "React 컴포넌트 메모이제이션과 코드 스플리팅을 통해 초기 로딩 시간 단축"
      },
      {
        title: "애니메이션 구현",
        description: "Framer Motion을 활용한 부드러운 페이지 전환 애니메이션 구현"
      }
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/800x500/3b82f6/FFFFFF?text=Portfolio+Screenshot+1",
        description: "메인 페이지"
      },
      {
        imageUrl: "https://via.placeholder.com/800x500/3b82f6/FFFFFF?text=Portfolio+Screenshot+2",
        description: "프로젝트 목록 페이지"
      },
      {
        imageUrl: "https://via.placeholder.com/800x500/3b82f6/FFFFFF?text=Portfolio+Screenshot+3",
        description: "프로젝트 상세 페이지"
      }
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/example/portfolio"
      },
      {
        type: "DOC",
        title: "기술 문서",
        icon: "fas fa-file-alt",
        link: "https://example.com/portfolio-docs"
      }
    ]
  },
  "2": {
    id: "2",
    title: "쇼핑몰 API 서버",
    description: "NestJS와 TypeScript를 사용하여 개발한 쇼핑몰 백엔드 API 서버입니다. RESTful API 설계 원칙을 준수하며, 제품 관리, 주문 처리, 사용자 인증 등의 기능을 제공합니다.",
    role: "백엔드 개발자",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker"],
    periodStart: new Date("2022-09-10"),
    periodEnd: new Date("2022-12-20"),
    features: [
      {
        title: "사용자 인증",
        description: "JWT 기반 사용자 인증 및 권한 관리 시스템",
        imageUrl: "https://via.placeholder.com/800x500/4f46e5/FFFFFF?text=Auth+System"
      },
      {
        title: "결제 시스템 연동",
        description: "외부 결제 게이트웨이와 연동된 안전한 결제 프로세스",
        imageUrl: "https://via.placeholder.com/800x500/4f46e5/FFFFFF?text=Payment+System"
      }
    ],
    techChallenges: [
      {
        title: "데이터베이스 최적화",
        description: "인덱싱과 쿼리 최적화를 통한 대규모 데이터 처리 성능 향상"
      },
      {
        title: "트랜잭션 관리",
        description: "결제 및 주문 처리 과정에서의 데이터 무결성 보장을 위한 트랜잭션 관리"
      }
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/800x500/4f46e5/FFFFFF?text=API+Documentation",
        description: "Swagger API 문서"
      },
      {
        imageUrl: "https://via.placeholder.com/800x500/4f46e5/FFFFFF?text=Database+Schema",
        description: "데이터베이스 스키마"
      }
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/example/shopping-api"
      },
      {
        type: "DOC",
        title: "API 문서",
        icon: "fas fa-book",
        link: "https://example.com/api-docs"
      }
    ]
  },
  "3": {
    id: "3",
    title: "일정 관리 앱",
    description: "React Native와 Redux를 사용하여 개발한 크로스 플랫폼 모바일 일정 관리 애플리케이션입니다. 사용자들이 효율적으로 일정을 관리하고 알림을 받을 수 있는 기능을 제공합니다.",
    role: "모바일 앱 개발자",
    stack: ["React Native", "Redux", "Firebase", "Expo"],
    periodStart: new Date("2022-06-01"),
    periodEnd: new Date("2022-08-15"),
    features: [
      {
        title: "일정 관리",
        description: "드래그 앤 드롭으로 일정을 쉽게 관리할 수 있는 직관적인 UI",
        imageUrl: "https://via.placeholder.com/800x500/16a34a/FFFFFF?text=Task+Management"
      },
      {
        title: "알림 시스템",
        description: "중요 일정에 대한 푸시 알림 시스템",
        imageUrl: "https://via.placeholder.com/800x500/16a34a/FFFFFF?text=Notification+System"
      }
    ],
    techChallenges: [
      {
        title: "오프라인 모드",
        description: "네트워크 연결 없이도 작동하는 오프라인 기능 구현"
      },
      {
        title: "데이터 동기화",
        description: "여러 기기 간 실시간 데이터 동기화를 위한 Firebase 활용"
      }
    ],
    screenshots: [
      {
        imageUrl: "https://via.placeholder.com/800x500/16a34a/FFFFFF?text=Calendar+View",
        description: "캘린더 화면"
      },
      {
        imageUrl: "https://via.placeholder.com/800x500/16a34a/FFFFFF?text=Task+List",
        description: "할 일 목록 화면"
      },
      {
        imageUrl: "https://via.placeholder.com/800x500/16a34a/FFFFFF?text=Settings",
        description: "설정 화면"
      }
    ],
    documents: [
      {
        type: "GITHUB",
        title: "GitHub 저장소",
        icon: "fab fa-github",
        link: "https://github.com/example/todo-app"
      },
      {
        type: "STATS",
        title: "사용 통계",
        icon: "fas fa-chart-line",
        link: "https://example.com/app-stats"
      }
    ]
  }
};

const ProjectPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // API 호출 대신 더미 데이터 사용
    setTimeout(() => {
      if (!id) {
        setError("유효하지 않은 프로젝트 ID입니다.");
        setLoading(false);
        return;
      }

      const project = dummyProjectDetails[id];
      if (project) {
        setProjectData(project);
        setError(null);
      } else {
        setError("프로젝트를 찾을 수 없습니다.");
      }
      setLoading(false);
    }, 500); // 로딩 효과를 위한 지연 시간
  }, [id]);

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = async () => {
    // 실제 삭제 대신 목록 페이지로 리다이렉트
    alert("프로젝트가 성공적으로 삭제되었습니다.");
    navigate("/projects");
  };

  // 삭제 모달 열기
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">프로젝트 정보를 불러오는 중...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !projectData) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <i className="fas fa-exclamation-circle text-3xl"></i>
          </div>
          <p className="text-red-600 font-medium">
            {error || "프로젝트를 찾을 수 없습니다."}
          </p>
          <Link
            to="/projects"
            className="text-indigo-600 hover:underline mt-4 inline-block"
          >
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </PageLayout>
    );
  }

  // 기간 포맷팅
  const formatPeriod = () => {
    if (!projectData.periodStart || !projectData.periodEnd) {
      return "기간 정보 없음";
    }
    
    const startDate = new Date(projectData.periodStart);
    const endDate = new Date(projectData.periodEnd);

    const formatDate = (date: Date) => {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <PageLayout>
      {/* 삭제 확인 모달 컴포넌트 */}
      <DeleteProjectModal
        visible={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProject}
        projectTitle={projectData.title}
      />
      
      {/* 프로젝트 헤더 */}
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900">
            {projectData.title}
          </h1>
          <div className="flex gap-2">
            <Link
              to={`/projects/edit/${projectData.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <i className="fas fa-edit mr-1.5"></i>
              수정
            </Link>
            <button
              onClick={openDeleteModal}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="프로젝트 삭제"
              title="이 프로젝트를 삭제합니다"
            >
              <i className="fas fa-trash-alt mr-1.5"></i>
              삭제
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {projectData.stack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-sm font-medium text-gray-500">프로젝트 기간</h3>
            <p className="mt-1 text-base text-gray-900">{formatPeriod()}</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-sm font-medium text-gray-500">담당 역할</h3>
            <p className="mt-1 text-base text-gray-900">{projectData.role}</p>
          </div>
        </div>
      </div>

      {/* 프로젝트 설명 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 개요</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line">
            {projectData.description}
          </p>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      {projectData.features && projectData.features.length > 0 && (
        <ProjectFeatures features={projectData.features} />
      )}

      {/* 기술적 도전 섹션 */}
      {projectData.techChallenges && projectData.techChallenges.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            기술적 도전과 해결 과정
          </h2>
          <div className="space-y-6">
            {projectData.techChallenges.map((challenge, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {index + 1}. {challenge.title}
                </h3>
                <p className="text-gray-600">{challenge.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 실제 구현 화면 섹션 */}
      {projectData.screenshots && projectData.screenshots.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            실제 구현 화면
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectData.screenshots.map((screenshot, index) => (
              <div key={index} className="relative group">
                <img
                  src={screenshot.imageUrl}
                  alt={screenshot.description || `스크린샷 ${index + 1}`}
                  className="rounded-lg shadow-sm w-full h-auto"
                />
                {screenshot.description && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <p className="text-white text-center px-4">
                      {screenshot.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 네비게이션 버튼 */}
      <div className="flex justify-between items-center">
        <Link
          to="/projects"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          프로젝트 목록
        </Link>
      </div>
    </PageLayout>
  );
};

export default ProjectPost;
