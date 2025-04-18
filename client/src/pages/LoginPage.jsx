```jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? login(email, password) : register(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <input className="mb-2 w-full p-2 border" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="mb-4 w-full p-2 border" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} className="mt-4 text-center text-sm text-blue-600 cursor-pointer">
          {isLogin ? 'No account? Register' : 'Have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
```
