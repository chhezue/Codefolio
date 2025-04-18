import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/project/ProjectCard";
import { api } from "../config/api";
import { Project } from "../components/project/ProjectCard";

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

  // API 연동
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api.projects);

        // fetchProjects 함수 내부에 추가
        if (response.data && response.data.items) {
          setProjects(response.data.items);
          setTotalPages(response.data.totalPages || 1);
          setTotalItems(response.data.total || 0);
        }

        // 응답 데이터 구조 확인 및 처리
        if (
          response.data &&
          response.data.items &&
          Array.isArray(response.data.items)
        ) {
          setProjects(response.data.items);
        } else if (Array.isArray(response.data)) {
          // 기존 배열 형식 지원 유지
          setProjects(response.data);
        } else {
          console.error("API 응답이 예상 형식이 아닙니다:", response.data);
          setProjects([]);
          setError("프로젝트 데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error(
          "프로젝트 데이터를 가져오는 중 오류가 발생했습니다:",
          err
        );
        setError("프로젝트 데이터를 불러오는 중 오류가 발생했습니다.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
