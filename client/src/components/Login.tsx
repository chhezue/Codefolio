import { useState } from "react";
import axios from "axios";
import { api } from "../config/api";

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(api.login, { password });

      if (res.data && res.data.token) {
        console.log(
          "로그인 성공, 토큰 수신:",
          res.data.token.substring(0, 15) + "..."
        );
        localStorage.setItem("admin_token", res.data.token);

        // 저장된 토큰 확인
        const savedToken = localStorage.getItem("admin_token");
        if (savedToken && savedToken === res.data.token) {
          console.log("토큰이 로컬 스토리지에 올바르게 저장되었습니다.");
          onSuccess();
        } else {
          console.error("토큰 저장 실패:", savedToken);
          setError("로그인 토큰 저장에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        setError("서버 응답 형식이 올바르지 않습니다.");
      }
    } catch (err: any) {
      console.error("로그인 오류:", err);
      if (err.response) {
        // 서버에서 응답이 왔지만 오류 상태 코드인 경우
        if (err.response.status === 401) {
          setError("비밀번호가 틀렸습니다.");
        } else {
          setError(
            `서버 오류: ${err.response.status} ${err.response.data?.message || ""}`
          );
        }
      } else if (err.request) {
        // 요청은 보냈지만 응답이 없는 경우 (서버 연결 문제)
        setError("서버에 연결할 수 없습니다. 네트워크 연결을 확인해 주세요.");
      } else {
        // 요청 구성 중 오류가 발생한 경우
        setError(`요청 오류: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          관리자 비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button
        onClick={login}
        disabled={isLoading}
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>로그인 중...
          </>
        ) : (
          "로그인"
        )}
      </button>
    </div>
  );
}

export default Login;
