import React from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  periodStart: Date;
  periodEnd: Date;
  stack: string[];
  pin: boolean;
  features: {
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  techChallenges: {
    title: string;
    description: string;
  }[];
  screenshots: {
    imageUrl: string;
    description?: string;
  }[];
  documents: {
    type: "GITHUB" | "DOC" | "STATS";
    title: string;
    icon?: string;
    link: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const thumbnailImage =
    project.screenshots?.[0]?.imageUrl ||
    project.features?.[0]?.imageUrl ||
    "/placeholder-project.jpg";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-400 h-full">
      {/* 이미지 */}
      <img
        src={thumbnailImage}
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
          {project.stack.map((tech, index) => (
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
