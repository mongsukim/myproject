/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t, i18n } = useTranslation('main');

  const toggleLocales = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
    },
    [i18n]
  );

  return (
    <div className="px-[20px] flex w-full items-center justify-between border-b-[1px] border-solid">
      <nav className="p-[10px]   ">
        <Link to="/" style={{ marginRight: '10px' }}>
          {/*Home*/}
          {t('Home')}
        </Link>
        <Link to="/BoardListPage" style={{ marginRight: '10px' }}>
          {/*Board List*/}
          {t('Board')}
        </Link>
        <Link to="/TodoListPage" style={{ marginRight: '10px' }}>
          {/*Todo List*/}
          {t('TodoList')}
        </Link>
        <Link to="/UserListPage" style={{ marginRight: '10px' }}>
          {/*User List*/}
          {t('UserList')}
        </Link>
      </nav>
      <div>
        한영전환 :
        <button onClick={() => toggleLocales('en-US')} title="영어로 바꾸기">
          EN
        </button>
        &nbsp;|&nbsp;
        <button onClick={() => toggleLocales('ko-KR')} title="한글로 바꾸기">
          KO
        </button>
      </div>
    </div>
  );
};

export default Navigation;
