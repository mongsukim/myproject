import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/BoardListPage">BoardListPage</Link>
        </li>
        <li>
          <Link to="/TodoListPage">TodoListPage</Link>
        </li>
        <li>
          <Link to="/UserListPage">UserListPage</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
