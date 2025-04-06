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
      { iconClass: 'devicon-amazonwebservices-original', color: '#ff9900', name: 'AWS', level: 60 },
    ],
  },
];

const TechStack: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <h2 className="text-3xl font-bold mb-12 text-center">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
              <div className="grid grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <i
                      className={`${item.iconClass} text-4xl mb-3`}
                      style={{ color: item.color }}
                    ></i>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-yellow-400 text-sm mt-1">
                      {'★'.repeat(item.level / 20) + '☆'.repeat(5 - item.level / 20)}
                    </div>
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
