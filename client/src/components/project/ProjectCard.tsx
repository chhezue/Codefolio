import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.github && (
            <a href={project.github} className="text-custom hover:text-custom-dark" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github mr-2"></i>GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="text-custom hover:text-custom-dark" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt mr-2"></i>Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
