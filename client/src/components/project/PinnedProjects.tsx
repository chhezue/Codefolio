import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { Project } from "./ProjectCard";

// 더미 데이터 추가
const dummyProjects: Project[] = [
  {
    id: 1,
    title: "포트폴리오 웹사이트",
    description: "React와 Tailwind CSS를 사용한 개인 포트폴리오 웹사이트입니다.",
    thumbnail: "https://via.placeholder.com/400x250/3b82f6/FFFFFF?text=Portfolio+Website",
    tags: ["React", "TypeScript", "Tailwind CSS"],
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
    tags: ["NestJS", "TypeScript", "PostgreSQL"],
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
    tags: ["React Native", "Redux", "Firebase"],
    startDate: "2022-06-01",
    endDate: "2022-08-15",
    demo: "https://example.com/todo-demo",
    github: "https://github.com/example/todo-app",
  }
];

const PinnedProjects: React.FC = () => {
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API 호출 대신 더미 데이터 사용
    setTimeout(() => {
      setPinnedProjects(dummyProjects);
      setLoading(false);
    }, 500); // 로딩 효과를 위한 지연 시간
  }, []);

  if (loading) {
    return <div className="text-center py-6 text-slate-600">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  // 핀된 프로젝트가 없는 경우
  if (pinnedProjects.length === 0) {
    return null; // 메인 페이지에서는 표시하지 않음
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">주요 프로젝트</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pinnedProjects.map((project) => (
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

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            모든 프로젝트 보기
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PinnedProjects;
