import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 실제 서버 URL로 변경

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', message: '' });
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
      const response = await axios.post(`${API_URL}/contact`, formData);

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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
          <div className="p-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-slate-800">연락하기</h3>
              <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* 폼 */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  이메일
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    placeholder="이메일 주소를 입력해주세요."
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  문의 내용
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    rows={5}
                    placeholder="내용을 자유롭게 작성해주세요."
                    required
                ></textarea>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-500 text-white text-sm py-2 rounded-md hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {loading ? '보내는 중...' : '보내기'}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ContactModal;