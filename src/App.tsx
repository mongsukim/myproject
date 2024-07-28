import React from 'react';
import '@atlaskit/css-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardListPage from './components/views/BoardListPage';
import TodoListPage from './components/views/TodoListPage';
import UserListPage from './components/views/UserListPage';
import Home from './components/views/Home';
import { RecoilRoot } from 'recoil';
import UserDetail from './components/views/UserDetail';
import PostDetail from './components/views/PostDetail';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
