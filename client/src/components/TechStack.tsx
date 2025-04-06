import React from 'react';

interface TechItem {
  iconClass: string;
  color: string;
  name: string;
  level: number; // 0 ~ 100
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    title: 'Language',
    items: [
      { iconClass: 'devicon-javascript-plain', color: '#f7df1e', name: 'JavaScript', level: 100 },
      { iconClass: 'devicon-typescript-plain', color: '#3178c6', name: 'TypeScript', level: 100 },
      { iconClass: 'devicon-java-plain', color: '#007396', name: 'Java', level: 80 },
      { iconClass: 'devicon-c-plain', color: '#a8b9cc', name: 'C', level: 80 },
      { iconClass: 'devicon-python-plain', color: '#3776AB', name: 'Python', level: 60 },
    ],
  },
  {
    title: 'Framework & Library',
    items: [
      { iconClass: 'devicon-react-original', color: '#61dafb', name: 'React', level: 50 },
      { iconClass: 'devicon-nodejs-plain', color: '#68a063', name: 'Node.js', level: 100 },
      { iconClass: 'devicon-nestjs-plain', color: '#e0234e', name: 'Nest.js', level: 100 },
    ],
  },
  {
    title: 'Database',
    items: [
      { iconClass: 'devicon-mongodb-plain', color: '#47A248', name: 'MongoDB', level: 80 },
      { iconClass: 'devicon-mysql-plain', color: '#00758f', name: 'MySQL', level: 70 },
      { iconClass: 'devicon-postgresql-plain', color: '#336791', name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    title: 'Tool etc',
    items: [
      { iconClass: 'devicon-git-plain', color: '#f1502f', name: 'Git', level: 90 },
      { iconClass: 'devicon-docker-plain', color: '#0db7ed', name: 'Docker', level: 60 },
      { iconClass: 'devicon-amazonwebservices-plain-wordmark', color: '#ff9900', name: 'AWS', level: 60 },
    ],
  },
];

const TechStack: React.FC = () => {
  return (
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">기술 스택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, idx) => (
                <div
                    key={idx}
                    className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold text-indigo-600 mb-4 text-center">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {category.items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-1">
                          <i
                              className={`${item.iconClass} text-2xl`}
                              style={{ color: item.color }}
                          ></i>
                          <span className="text-xs text-slate-700 font-medium">{item.name}</span>

                          {/* 게이지 바 컨테이너 */}
                          <div className="w-full flex justify-center">
                            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                              <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${item.level}%`,
                                    backgroundColor: item.color,
                                  }}
                              ></div>
                            </div>
                          </div>

                          {/* 퍼센트 표시 */}
                          <span className="text-[10px] text-slate-500">{item.level}%</span>
                        </div>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default TechStack;