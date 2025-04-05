import React from 'react';

interface Feature {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface ProjectFeaturesProps {
  features: Feature[];
}

const FeatureCard: React.FC<Feature> = ({ imageUrl, imageAlt, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img src={imageUrl} alt={imageAlt} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const ProjectFeatures: React.FC<ProjectFeaturesProps> = ({ features }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 기능</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default ProjectFeatures; 