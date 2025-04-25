import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProjectFeatures from "../components/project/ProjectFeatures";
import PageLayout from "../components/layout/PageLayout";
import { Project } from "../components/project/ProjectCard";
import DeleteProjectModal from "../components/project/DeleteProjectModal";
import { api } from "../config/api";

const ProjectPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) {
        setError("유효하지 않은 프로젝트 ID입니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(api.projectById(id));

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("프로젝트를 찾을 수 없습니다.");
          }
          throw new Error("프로젝트 정보를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setProjectData(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        setLoading(false);
      }
    };

    // 로그인 상태 확인
    const token = localStorage.getItem("admin_token");
    setIsLoggedIn(!!token);

    fetchProjectDetails();
  }, [id]);

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = async () => {
    try {
      const response = await fetch(api.deleteProject(id!), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("프로젝트 삭제에 실패했습니다.");
      }

      alert("프로젝트가 성공적으로 삭제되었습니다.");
      navigate("/projects");
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      closeDeleteModal();
    }
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
          {isLoggedIn && (
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
          )}
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
