import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectCard, { Project } from '../components/project/ProjectCard';

const API_URL = 'http://localhost:3000'; // 백엔드 서버 URL

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error('프로젝트 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('프로젝트 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-6">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <section id="projects" className="max-w-7xl mx-auto px-12 py-20">
      <h2 className="text-2xl font-bold mb-12 text-center">주요 프로젝트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;