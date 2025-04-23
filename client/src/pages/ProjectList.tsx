import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard";
import { Project } from "../components/project/ProjectCard";

// 더미 데이터 추가
const dummyProjects: Project[] = [
  {
    id: 1,
    title: "포트폴리오 웹사이트",
    description: "React와 Tailwind CSS를 사용한 개인 포트폴리오 웹사이트입니다.",
    thumbnail: "https://via.placeholder.com/400x250/3b82f6/FFFFFF?text=Portfolio+Website",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    startDate: "2023-01-01",
    endDate: "2023-02-15",
    demo: "https://example.com/demo",
    github: "https://github.com/example/portfolio",
  },
  {
    id: 2,
    title: "쇼핑몰 API 서버",
    description: "NestJS로 구현한 쇼핑몰 백엔드 API 서버입니다.",
    thumbnail: "https://via.placeholder.com/400x250/4f46e5/FFFFFF?text=Shopping+API",
    stack: ["NestJS", "TypeScript", "PostgreSQL"],
    startDate: "2022-09-10",
    endDate: "2022-12-20",
    demo: null,
    github: "https://github.com/example/shopping-api",
  },
  {
    id: 3,
    title: "일정 관리 앱",
    description: "할 일과 일정을 관리할 수 있는 모바일 앱입니다.",
    thumbnail: "https://via.placeholder.com/400x250/16a34a/FFFFFF?text=Todo+App",
    stack: ["React Native", "Redux", "Firebase"],
    startDate: "2022-06-01",
    endDate: "2022-08-15",
    demo: "https://example.com/todo-demo",
    github: "https://github.com/example/todo-app",
  },
  {
    id: 4,
    title: "채팅 애플리케이션",
    description: "실시간 채팅이 가능한 웹 애플리케이션입니다.",
    thumbnail: "https://via.placeholder.com/400x250/dc2626/FFFFFF?text=Chat+App",
    stack: ["React", "Node.js", "Socket.io"],
    startDate: "2023-03-01",
    endDate: "2023-04-15",
    demo: "https://example.com/chat-demo",
    github: "https://github.com/example/chat-app",
  },
  {
    id: 5,
    title: "날씨 정보 앱",
    description: "현재 위치 기반 날씨 정보를 제공하는 모바일 앱입니다.",
    thumbnail: "https://via.placeholder.com/400x250/0284c7/FFFFFF?text=Weather+App",
    stack: ["React Native", "Redux", "OpenWeatherMap API"],
    startDate: "2022-11-01",
    endDate: "2022-12-10",
    demo: "https://example.com/weather-demo",
    github: "https://github.com/example/weather-app",
  },
  {
    id: 6,
    title: "블로그 플랫폼",
    description: "마크다운 기반의 콘텐츠 작성이 가능한 블로그 플랫폼입니다.",
    thumbnail: "https://via.placeholder.com/400x250/7c3aed/FFFFFF?text=Blog+Platform",
    stack: ["Next.js", "MongoDB", "AWS S3"],
    startDate: "2023-05-01",
    endDate: "2023-06-20",
    demo: "https://example.com/blog-demo",
    github: "https://github.com/example/blog-platform",
  }
];

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 페이지당 프로젝트 수
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 필터링된 프로젝트
  const filteredProjects = React.useMemo(() => {
    return filter === "all"
      ? projects
      : projects.filter(
          (project) => project.stack && project.stack.includes(filter)
        );
  }, [projects, filter]);

  // 모든 기술 스택 추출 (중복 제거)
  const allTechnologies = React.useMemo(() => {
    // projects가 배열인지 확인
    if (!Array.isArray(projects)) {
      return [];
    }

    const techs = projects.flatMap((project) => project.stack || []);
    return Array.from(new Set(techs)).sort();
  }, [projects]);

  // 현재 페이지에 표시할 프로젝트
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // 총 페이지 수 계산
  const calculatedTotalPages = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // API 연동 대신 더미 데이터 사용
  useEffect(() => {
    // 로딩 효과를 위한 지연
    setTimeout(() => {
      setProjects(dummyProjects);
      setTotalItems(dummyProjects.length);
      setTotalPages(Math.ceil(dummyProjects.length / projectsPerPage));
      setLoading(false);
    }, 500);
  }, []);

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (loading) {
    return <div className="text-center py-6 text-slate-600">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">프로젝트</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Link
            to="/projects/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>프로젝트 등록
          </Link>
        </div>
      </div>

      {/* 필터 버튼 */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          전체
        </button>
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tech
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="transition-all duration-300 hover:-translate-y-2"
          >
            <Link to={`/projects/${project.id}`} className="block h-full">
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                    currentPage === number
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </nav>
        </div>
      )}
    </section>
  );
};

export default ProjectList;
