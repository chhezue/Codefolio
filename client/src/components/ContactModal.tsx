import React, { useState } from "react";
import axios from "axios";
import { api } from "../config/api";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      setSubmitResult({
        success: false,
        message: "이메일과 메시지를 모두 입력해주세요.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("API 요청 URL:", api.mail);
      await axios.post(api.mail, { email, message });

      setSubmitResult({
        success: true,
        message: "메시지가 성공적으로 전송되었습니다!",
      });

      setEmail("");
      setMessage("");

      setTimeout(() => {
        onClose();
        setSubmitResult(null);
      }, 3000);
    } catch (error) {
      console.error("메일 전송 오류:", error);
      setSubmitResult({
        success: false,
        message: "메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">연락하기</h2>

        {submitResult ? (
          <div
            className={`p-4 mb-4 rounded ${
              submitResult.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitResult.message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              메시지
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="메시지를 입력해주세요..."
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 mr-2"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "전송 중..." : "전송"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
