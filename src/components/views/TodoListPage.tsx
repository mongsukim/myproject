/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TodoListPage = () => {
  const { t, i18n } = useTranslation('main');

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 필터 상태 추가

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

  // 필터링된 todos 계산
  const filteredTodos = todos.filter((item) => {
    if (filter === 'completed') return item.completed;
    if (filter === 'incomplete') return !item.completed;
    return true; // 'all'일 경우
  });

  return (
    <div>
      <div className="filter-buttons mt-[20px]">
        <button
          className={`${filter === 'all' ? 'font-bold' : ''}`}
          onClick={() => setFilter('all')}
        >
          {/*모두 보기*/}
          {t('SeeAll')}
        </button>
      </div>
      <div className="mt-[20px] w-[700px] mx-auto outline outline-1 outline-gray-500">
        <div className="flex py-[10px] justify-center border border-b-[1px] border-solid">
          <div className="w-2/5 flex justify-center">
            <button
              className={`${filter === 'completed' ? 'font-bold' : ''} flex flex-col items-center`}
              onClick={() => setFilter('completed')}
            >
              {/*미완료된 할일*/}
              <div>
                <img src="/images/checkbox-blank-line.png" alt="완료" />
              </div>
              <div className="text-[11px]">{t('Uncompleted')}</div>
            </button>
            &nbsp;|&nbsp;
            <button
              className={`${filter === 'incomplete' ? 'font-bold' : ''}`}
              onClick={() => setFilter('incomplete')}
            >
              {/*완료된 할일*/}
              <div>
                <img src="/images/checkbox-line.png" alt="미완료" />
              </div>
              <div className="text-[11px]">{t('Completed')}</div>
            </button>
          </div>
          <div className="w-3/5 flex justify-center">{t('todo')}</div>
        </div>
        {filteredTodos.map((item, index) => (
          <div
            key={index}
            className="flex justify-center border border-b-[1px] border-solid py-[5px]"
          >
            <div className="w-2/5 flex justify-center">
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
            <div className="w-3/5">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
