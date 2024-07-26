import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserListPage from "./components/views/UserListPage";
import BoardListPage from "./components/views/BoardListPage";
import TodoListPage from "./components/views/TodoListPage";

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/BoardListPage" element={<BoardListPage />} />
            <Route path="/TodoListPage" element={<TodoListPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;