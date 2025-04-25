import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard";
import { Project } from "../components/project/ProjectCard";
import { api } from "../config/api";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 페이지당 프로젝트 수
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // API에서 프로젝트 가져오기
  const fetchProjects = async (
    page = 1,
    limit = projectsPerPage,
    stack?: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(api.getProjects(page, limit, stack));

      if (!response.ok) {
        throw new Error("프로젝트를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setProjects(data.items);
      setTotalItems(data.total);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      setLoading(false);
    }
  };

  // 모든 기술 스택 가져오기
  const fetchAllTechnologies = async () => {
    try {
      const response = await fetch(api.getStacks);

      if (!response.ok) {
        throw new Error("기술 스택을 불러오는데 실패했습니다.");
      }

      const technologies = await response.json();
      setAllTechnologies(technologies);
    } catch (err) {
      console.error("기술 스택을 가져오는데 실패했습니다:", err);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchProjects();
    fetchAllTechnologies();
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인하여 로그인 상태 결정
    const token = localStorage.getItem("admin_token");
    setIsLoggedIn(!!token);
  }, []);

  // 필터 변경 시 프로젝트 다시 로드
  useEffect(() => {
    if (filter === "all") {
      fetchProjects(1, projectsPerPage);
    } else {
      fetchProjects(1, projectsPerPage, filter);
    }
  }, [filter]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    if (filter === "all") {
      fetchProjects(pageNumber, projectsPerPage);
    } else {
      fetchProjects(pageNumber, projectsPerPage, filter);
    }
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && projects.length === 0) {
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
          {isLoggedIn && (
            <Link
              to="/projects/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>프로젝트 등록
            </Link>
          )}
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
        {projects.map((project) => (
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
