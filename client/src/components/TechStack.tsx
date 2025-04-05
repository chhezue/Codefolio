import React from 'react';

interface TechCategory {
  title: string;
  items: {
    icon: string;
    name: string;
  }[];
}

const TechStack: React.FC = () => {
  const categories: TechCategory[] = [
    {
      title: '[Language]',
      items: [
        {icon: 'devicon-javascript-plain', name: 'JavaScript'},
        {icon: 'devicon-typescript-plain', name: 'TypeScript'},
        {icon: 'devicon-java-plain', name: 'Java'},
        {icon: 'devicon-c-plain', name: 'C'},
        {icon: 'devicon-python-plain', name: 'Python'},
      ],
    },
    {
      title: '[Framework & Library]',
      items: [
        {icon: 'devicon-react-original', name: 'React'},
        {icon: 'devicon-nodejs-plain', name: 'Node.js'},
        {icon: 'devicon-nestjs-plain', name: 'Nest.js'},
      ],
    },
    {
      title: '[Database]',
      items: [
        {icon: 'devicon-mysql-plain', name: 'MySQL'},
        {icon: 'devicon-mongodb-plain', name: 'MongoDB'},
        {icon: 'devicon-postgresql-plain', name: 'PostgreSQL'},
      ],
    },
    {
      title: '[TOOL etc]',
      items: [
        {icon: 'devicon-git-plain', name: 'Git'},
        {icon: 'devicon-docker-plain', name: 'Docker'},
        {icon: 'devicon-amazonwebservices-original', name: 'AWS'},
      ],
    },
  ];

  return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-2xl font-bold mb-12 text-center">기술 스택</h2>
          <div className="grid grid-cols-2 gap-8">
            {categories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-4 text-center">{category.title}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col items-center">
                          <i className={`${item.icon} text-4xl text-custom mb-3`}></i>
                          <span>{item.name}</span>
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