import React from "react";

interface DeleteProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  visible,
  onClose,
  onConfirm,
  projectTitle,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">프로젝트 삭제 확인</h3>
        <p className="text-gray-600 mb-6">
          정말로 <span className="font-semibold text-red-600">{projectTitle}</span> 프로젝트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal; 