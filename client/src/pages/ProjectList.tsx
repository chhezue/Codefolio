import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

const ProjectList: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: '데이터 분석 대시보드',
      description: 'React와 D3.js를 활용한 실시간 데이터 시각화 대시보드',
      imageUrl: 'https://creatie.ai/ai/api/search-image?query=A modern web application dashboard interface with clean design, showing data analytics and charts. Professional UI design with light theme.&width=600&height=400&orientation=landscape&flag=145b9ec6-564f-468c-82b8-0928caaf9b28&flag=2bc03894-3564-448f-9dd9-c0d8aea60c1e&flag=4d61e63c-d840-4623-8087-ccf04544cfee&flag=77d09343-23d7-4d2e-9be2-8065beebbc42&flag=58243b56-fd79-4491-8cc6-9ab92a7b3312',
      technologies: ['React', 'D3.js', 'Node.js'],
    },
    {
      id: '2',
      title: '이커머스 플랫폼',
      description: 'Next.js와 TypeScript로 구현한 현대적인 쇼핑몰',
      imageUrl: 'https://creatie.ai/ai/api/search-image?query=A mobile app interface for an e-commerce platform with modern minimal design, showing product listings and shopping cart. Clean UI with light theme.&width=600&height=400&orientation=landscape&flag=6c22ef3e-1eff-4151-b1b5-26e410ff3359&flag=4e4c387c-03bb-487b-bdc2-0e4af20ab62d&flag=bb8a3c85-893f-4c17-9dd6-6b7253122bda&flag=b7ca1549-71a9-4cc5-bbc2-005b63893b46&flag=590ca931-b518-48b5-a709-8bbd019495f7',
      technologies: ['Next.js', 'TypeScript', 'MongoDB'],
    },
  ];

  return (
    <section id="projects" className="max-w-7xl mx-auto px-12 py-20">
      <h2 className="text-2xl font-bold mb-12 text-center">주요 프로젝트</h2>
      <div className="grid grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex space-x-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-custom rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectList; 