import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import { Project } from "./ProjectCard";
import { api } from "../../config/api";

const PinnedProjects: React.FC = () => {
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api.pinnedProjects);

        // 응답 데이터 구조 확인 및 처리
        if (
          response.data &&
          response.data.items &&
          Array.isArray(response.data.items)
        ) {
          setPinnedProjects(response.data.items);
        } else if (Array.isArray(response.data)) {
          // 기존 배열 형식 지원 유지
          setPinnedProjects(response.data);
        } else {
          console.error("API 응답이 예상 형식이 아닙니다:", response.data);
          setPinnedProjects([]);
          setError("고정된 프로젝트 데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error(
          "고정된 프로젝트 데이터를 가져오는 중 오류가 발생했습니다:",
          err
        );
        setError("고정된 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.");
        setPinnedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedProjects();
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
