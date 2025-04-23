// 프로젝트 도전 과제 입력 폼 컴포넌트
import React from "react";

interface ChallengeFormProps {
  challenges: {
    number: number;
    title: string;
    description: string;
  }[];
  handleChallengeChange: (index: number, field: string, value: string) => void;
  handleRemoveChallenge: (index: number) => void;
  handleAddChallenge: () => void;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({
  challenges,
  handleChallengeChange,
  handleRemoveChallenge,
  handleAddChallenge,
}) => {
  return (
    <section className="mb-14">
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">
          기술적 도전과 해결과정
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{challenges.length}/3</span>
          <button
            type="button"
            onClick={handleAddChallenge}
            disabled={challenges.length >= 3}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              challenges.length >= 3
                ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                : "text-accent-500 bg-accent-50 hover:bg-accent-100"
            } transition-colors`}
          >
            + 도전 과제 추가
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="p-7 bg-gray-50 rounded-xl relative hover:bg-gray-100/50 transition-all shadow-sm"
          >
            {challenges.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveChallenge(index)}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            )}

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-500 text-white font-medium shadow-sm">
                      {challenge.number}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={challenge.title}
                    onChange={(e) =>
                      handleChallengeChange(index, "title", e.target.value)
                    }
                    className="flex-1 px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="도전 과제 제목"
                    required
                  />
                </div>
              </div>

              <div className="pl-14">
                <textarea
                  value={challenge.description}
                  onChange={(e) =>
                    handleChallengeChange(index, "description", e.target.value)
                  }
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  rows={3}
                  placeholder="도전 과제에 대한 자세한 설명과 해결 과정"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChallengeForm;
