import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import UserListPage from '../views/UserListPage';
import BoardListPage from '../views/BoardListPage';
import TodoListPage from '../views/TodoListPage';
import MainLayout from '../layout/MainLayout';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UserListPage />} />
          <Route path="/BoardListPage" element={<BoardListPage />} />
          <Route path="/TodoListPage" element={<TodoListPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
