import React from 'react';

export interface AlgorithmItem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  date: string;
}

interface AlgorithmCardProps {
  item: AlgorithmItem;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ item }) => {
  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return '쉬움';
      case 'medium':
        return '중간';
      case 'hard':
        return '어려움';
      default:
        return '기타';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <span className={`px-3 py-1 text-sm font-medium ${getDifficultyClass(item.difficulty)} rounded-full`}>
          {getDifficultyText(item.difficulty)}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <i className="fas fa-code mr-2"></i>
          <span>{item.tags.join(', ')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{item.date}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* 추가 태그 또는 기능 버튼이 필요하면 여기에 */}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard; 