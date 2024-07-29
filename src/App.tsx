import React from 'react';
import '@atlaskit/css-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardListPage from './components/pages/BoardListPage';
import TodoListPage from './components/pages/TodoListPage';
import UserListPage from './components/pages/UserListPage';
import Home from './components/pages/Home';
import { RecoilRoot } from 'recoil';
import UserDetail from './components/pages/details/UserDetail';
import PostDetail from './components/pages/details/PostDetail';
import '../src/index.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<BoardListPage />} />
          <Route path="/BoardListPage" element={<BoardListPage />} />
          <Route path="/TodoListPage" element={<TodoListPage />} />
          <Route path="/UserListPage" element={<UserListPage />} />
          <Route path="/UserDetail/:id" element={<UserDetail />} />
          <Route path="/PostDetail/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
