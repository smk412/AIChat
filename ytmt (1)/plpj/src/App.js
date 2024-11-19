import './styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from './component/Home';
import Nave from './component/Nave';
import Aichating from './component/Aichating';
import Faq from './component/Faq';
import Board from './component/Board';
import Login from './component/Login';
import SignUp from './component/Sign_up';
import BoardCreate from './component/BoardCreate';
import BoardDetails from './component/BoardDetails';
import Gathertown from './component/Gathertown';

const URL = "http://localhost:8080";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${URL}/user/login`, { email, password });
      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        return true;
      } else {
        console.error('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  const signup = async ({ nickname, email, password, name, major }) => {
    try {
      const response = await axios.post(`${URL}/user/sign_up`, {
        nickname,
        email,
        name,
        password,
        major,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Sign up failed:', error);
      return false;
    }
  };

  // 수정된 Aichat 함수
  const Aichat = async (input) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${URL}/ai/generate`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('AI chat error:', error);
    }
  };

  const getMap = async () => {
    try {
      const response = await axios.get(`${URL}/Gathertown`);
      return response.data;
    } catch (error) {
      console.error('Map fetch error:', error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/Gathertown/users`);
      return response.data;
    } catch (error) {
      console.error('Users fetch error:', error);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get(`${URL}/Gathertown/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('User fetch error:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nave isAuthenticated={isAuthenticated} logout={logout} />}>
          <Route index element={<Home />} />
          <Route path='/Board' element={<Board />} />
          <Route path='/Board/Create' element={<BoardCreate />} />
          <Route path='/Board/:id' element={<BoardDetails />} />
          <Route path='/Aichating' element={<Aichating Aichat={Aichat} />} />
          <Route path='/Login' element={<Login login={login} />} />
          <Route path='/SignUp' element={<SignUp signup={signup} />} />
          <Route path='/Faq' element={<Faq />} />
          <Route path='/Gathertown' element={<Gathertown getMap={getMap} getUsers={getUsers} getUser={getUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
