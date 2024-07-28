import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoListPage = () => {
  const [todos, setTodos] = useState();
  useEffect(() => {
    axios
      .get('https://koreanjson.com/todos')
      .then((response) => {
        console.log('todo response', response?.data);
        setTodos(response?.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      TodoListPage
      <div>
        {todos?.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.completed ? (
              <div>
                <img src="/images/checkbox-blank-line.png" alt="완료" />
              </div>
            ) : (
              <div>
                <img src="/images/checkbox-line.png" alt="미완료" />
              </div>
            )}
            &nbsp;|&nbsp;
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoListPage;
