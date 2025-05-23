export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

export const api = {
  // 메일 관련 엔드포인트
  mail: `${API_URL}/mail`,

  // 프로젝트 관련 엔드포인트
  projects: `${API_URL}/projects`,
  getProjects: (page: number = 1, limit: number = 10, stack?: string) =>
    `${API_URL}/projects?page=${page}&limit=${limit}${stack ? `&stack=${stack}` : ""}`,
  getStacks: `${API_URL}/projects/stacks`,
  projectById: (id: string) => `${API_URL}/projects/${id}`,
  pinnedProjects: `${API_URL}/projects/pin`,
  createProject: `${API_URL}/projects`,
  updateProject: (id: string) => `${API_URL}/projects/${id}`,
  deleteProject: (id: string) => `${API_URL}/projects/${id}`,

  // 로그인 엔드포인트
  login: `${API_URL}/auth/login`,
};
