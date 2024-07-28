/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TodoListPage = () => {
  const { t, i18n } = useTranslation('main');

  const toggleLocales = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
    },
    [i18n]
  );
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
      한영전환 :
      <button onClick={() => toggleLocales('en-US')} title="영어로 바꾸기">
        EN
      </button>
      &nbsp;|&nbsp;
      <button onClick={() => toggleLocales('ko-KR')} title="한글로 바꾸기">
        KO
      </button>
      <div className=" mt-[100px] w-[700px] mx-auto outline outline-1 outline-gray-500">
        <div className="flex py-[10px] justify-center border border-b-[1px] border-solid ">
          <div className="w-1/5 flex justify-center">{t('complete')}</div>
          <div className="w-4/5 flex justify-center">{t('todo')}</div>
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
