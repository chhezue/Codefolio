import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../../components/project/ProjectCard';

const API_URL = 'http://localhost:3000';

// GetProjectDto 기반 프로젝트 타입 정의
export interface Project {
  id: number;
  title: string;
  summary: string;
  githubUrl: string;
  period: string;
  role: string;
  technologies: string[];
  pin: boolean;
  features: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];
  challenges: {
    number: number;
    title: string;
    description: string;
  }[];
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // 페이지당 6개 프로젝트

  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 기술 스택 필터 목록 생성
  const allTechnologies = Array.from(new Set(
    projects.flatMap(project => project.technologies)
  )).sort();

  // 필터링 및 검색 결과 계산
  const getFilteredProjects = () => {
    // 검색 중인 경우 검색 결과를 필터링
    const projectsToFilter = isSearching ? searchResults : projects;
    
    return filter === 'all' 
      ? projectsToFilter 
      : projectsToFilter.filter(project => 
        project.technologies.includes(filter)
      );
  };

  const filteredProjects = getFilteredProjects();
  
  // 현재 페이지에 표시할 프로젝트
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // API 연동
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
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          전체
        </button>
        {allTechnologies.map(tech => (
          <button 
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tech 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
            <Link 
              to={`/projects/${project.id}`} 
              className="block h-full"
            >
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>

      {/* 표시할 프로젝트가 없을 때 */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">
            {isSearching
              ? `"${searchKeyword}"에 대한 검색 결과가 없습니다`
              : '프로젝트를 찾을 수 없습니다'}
          </h3>
          <p>
            {isSearching 
              ? '다른 키워드로 검색해보세요'
              : '다른 필터를 선택해보세요'}
          </p>
        </div>
      )}

      {/* 페이지네이션 */}
      {filteredProjects.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              이전
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === index + 1
                    ? 'z-10 bg-indigo-600 text-white border-indigo-500'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
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