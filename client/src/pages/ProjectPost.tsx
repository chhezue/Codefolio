import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectFeatures from "../components/project/ProjectFeatures";
import PageLayout from "../components/layout/PageLayout";
import { api } from "../config/api";
import { Project } from "../components/project/ProjectCard";

const ProjectPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await axios.get(api.projectById(id));
        setProjectData(response.data);
      } catch (err) {
        console.error(
          "프로젝트 데이터를 가져오는 중 오류가 발생했습니다:",
          err
        );
        setError("프로젝트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = async () => {
    if (!id || !window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await axios.delete(api.deleteProject(id));
      navigate("/projects");
    } catch (err) {
      console.error("프로젝트 삭제 중 오류가 발생했습니다:", err);
      alert("프로젝트 삭제에 실패했습니다.");
    }
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
    const startDate = new Date(projectData.periodStart);
    const endDate = new Date(projectData.periodEnd);

    const formatDate = (date: Date) => {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <PageLayout>
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
              onClick={handleDeleteProject}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
            >
              <i className="fas fa-trash-alt mr-1.5"></i>
              삭제
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {projectData.stack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">프로젝트 기간</h3>
            <p className="mt-1 text-base text-gray-900">{formatPeriod()}</p>
          </div>
          <div>
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

      {/* 프로젝트 문서 링크 */}
      {projectData.documents && projectData.documents.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            프로젝트 문서
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectData.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 mr-4">
                  <i className={doc.icon || "fas fa-file-alt"}></i>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500">{doc.type}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

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
