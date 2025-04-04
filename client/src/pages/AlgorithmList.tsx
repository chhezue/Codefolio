import React, { useState, useEffect } from 'react';
import { AlgorithmItem } from '../components/algorithm/AlgorithmCard';
import AlgorithmCard from '../components/algorithm/AlgorithmCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // API 서버 URL (실제 환경에 맞게 수정)

const AlgorithmList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [algorithmItems, setAlgorithmItems] = useState<AlgorithmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 모든 알고리즘 데이터 가져오기
  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/algorithms`);
        setAlgorithmItems(response.data);
        setError(null);
      } catch (err) {
        console.error('알고리즘 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('알고리즘 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  // 검색 기능
  const handleSearch = async () => {
    if (!searchQuery) {
      // 검색어가 없으면 모든 알고리즘 가져오기
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/algorithms`);
        setAlgorithmItems(response.data);
        setError(null);
      } catch (err) {
        console.error('알고리즘 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('알고리즘 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/algorithms/${searchQuery}`);
      setAlgorithmItems(response.data);
      setError(null);
    } catch (err) {
      console.error('검색 중 오류가 발생했습니다:', err);
      setError('검색 결과를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 항목
  const filteredItems = algorithmItems.filter(item => {
    const matchesDifficulty = difficultyFilter === '' || 
      item.difficulty === difficultyFilter;
    
    return matchesDifficulty;
  });

  // 필터 초기화
  const resetFilters = async () => {
    setSearchQuery('');
    setDifficultyFilter('');
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/algorithms`);
      setAlgorithmItems(response.data);
      setError(null);
    } catch (err) {
      console.error('알고리즘 데이터를 가져오는 중 오류가 발생했습니다:', err);
      setError('알고리즘 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">알고리즘 학습 기록</h1>
          <p className="text-lg text-gray-600">알고리즘과 자료구조 문제 풀이를 통한 학습 여정을 기록합니다. 각 카드를 클릭하여 상세 내용을 확인하세요.</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <span className="text-gray-600">
              {loading ? '데이터 로딩 중...' : `전체 ${algorithmItems.length}개 중 ${filteredItems.length}개 표시`}
            </span>
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="!rounded-button pl-10 pr-4 py-2 border border-gray-300 focus:border-custom focus:ring-1 focus:ring-custom"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={handleSearch}></i>
            </div>

            <select 
              className="!rounded-button pl-4 pr-8 py-2 border border-gray-300 focus:border-custom focus:ring-1 focus:ring-custom appearance-none bg-white"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">난이도</option>
              <option value="easy">쉬움</option>
              <option value="medium">중간</option>
              <option value="hard">어려움</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-custom text-4xl mb-4"></i>
            <p className="text-gray-600">알고리즘 데이터를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
            <p className="text-red-500">{error}</p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
            <p className="text-gray-600">검색 결과가 없습니다.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 text-custom hover:underline"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Link key={item.id} to={`/algorithm/${item.id}`} className="block hover:shadow-md transition-shadow duration-300">
                <AlgorithmCard item={item} />
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 알고리즘 &amp; 자료구조 학습. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AlgorithmList;