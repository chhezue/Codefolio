import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/api";

export interface Project {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  periodStart?: string;
  periodEnd?: string;
  period?: string;
  stack?: string[];
  technologies?: string[];
  tags?: string[];
  role?: string;
  pin?: boolean;
  githubUrl?: string;
  features?: {
    id?: string;
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
  }[];
  screenshots?: {
    id?: string;
    imageUrl?: string;
    imageAlt?: string;
    description?: string;
  }[];
  challenges?: {
    id?: string;
    number: number;
    title: string;
    description: string;
  }[];
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // 이미지 URL 처리 - 상대 경로인 경우 API_URL 추가
  const getImageUrl = (url: string | undefined) => {
    if (!url) return "";
    // 이미지 URL이 /uploads로 시작하면 API_URL을 앞에 추가
    if (url.startsWith("/uploads")) {
      return `${API_URL}${url}`;
    }
    // 이미 절대 URL이거나 데이터 URL인 경우 그대로 사용
    return url;
  };

  const thumbnailImage =
    project.thumbnail ||
    project.screenshots?.[0]?.imageUrl ||
    project.features?.[0]?.imageUrl ||
    "/placeholder-project.jpg";

  // 태그와 스택 통합
  const technologies = project.tags || project.stack || [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-400 h-full">
      {/* 이미지 */}
      <img
        src={getImageUrl(thumbnailImage)}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      {/* 콘텐츠 */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* 기술 스택 */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
