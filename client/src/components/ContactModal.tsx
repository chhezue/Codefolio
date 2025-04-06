import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 실제 서버 URL로 변경

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
          `${API_URL}/contact`,
          formData
      );

      if (response.data.success) {
        alert('메일이 성공적으로 전송되었습니다!');
        onClose();
        setFormData({ email: '', message: '' });
      } else {
        alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('메일 전송 오류:', error);
      alert('메일 전송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold">연락하기</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">이메일</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
                  placeholder="회신 받으실 이메일을 입력해주세요."
                  required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">문의 내용</label>
              <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="취업 제안이나 프로젝트 협업 등 문의하실 내용을 자유롭게 작성해주세요."
                  required
              ></textarea>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-400 text-white px-4 py-1.5 text-xs rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              {loading ? '보내는 중...' : '보내기'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default ContactModal;