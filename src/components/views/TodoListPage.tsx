/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

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
      <div className=" mt-[100px] w-[700px] mx-auto outline outline-1 outline-gray-500">
        <div className="flex py-[10px] justify-center border border-b-[1px] border-solid ">
          <div className="w-1/5 flex justify-center">완료 여부</div>
          <div className="w-4/5 flex justify-center">할 일</div>
        </div>
        {todos?.map((item, index) => (
          <div
            key={index}
            className="flex justify-center border border-b-[1px] border-solid py-[5px] "
          >
            <div className="w-1/5 flex justify-center">
              {item.completed ? (
                <div>
                  <img src="/images/checkbox-blank-line.png" alt="완료" />
                </div>
              ) : (
                <div>
                  <img src="/images/checkbox-line.png" alt="미완료" />
                </div>
              )}
            </div>
            <div className="w-4/5">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoListPage;
