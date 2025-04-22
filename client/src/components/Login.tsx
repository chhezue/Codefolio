import { useState } from 'react';
import axios from 'axios';

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('/auth/login', { password });
      localStorage.setItem('admin_token', res.data.token);
      onSuccess();
    } catch {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>로그인</button>
    </div>
  );
}

export default Login;