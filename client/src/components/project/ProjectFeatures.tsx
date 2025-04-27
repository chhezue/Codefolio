import React from "react";
import { API_URL } from "../../config/api";

interface Feature {
  title: string;
  description: string;
  imageUrl?: string;
}

interface ProjectFeaturesProps {
  features: Feature[];
}

const FeatureCard: React.FC<Feature> = ({ imageUrl, title, description }) => {
  // 이미지 URL 처리 - 상대 경로인 경우 API_URL 추가
  const getImageUrl = (url: string | undefined) => {
    if (!url) return "";
    // 이미지 URL이 /uploads로 시작하면 API_URL을 앞에 추가
    if (url.startsWith("/uploads")) {
      return `${API_URL}${url}`;
    }
    // 이미 절대 URL이거나 데이터 URL인 경우 그대로 사용
    return url;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {imageUrl && (
        <img
          src={getImageUrl(imageUrl)}
          alt={title}
          className="w-full h-64 object-cover"
        />
      )}
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
