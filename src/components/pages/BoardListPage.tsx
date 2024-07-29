/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@atlaskit/button/new';
import { AutoComplete } from '../AutoComplete';
import {
  searchTermState,
  setShowSuggestionState,
  setSuggestionState,
} from '../../atom/atoms';
import { handleSearchTermChange } from '../../function/handleSearchTermChange';
import { formDate } from '../../function/formDate';
import { createKey } from '../../function/createKey';

interface BoardList {
  UserId: number;
  id: number;
  title: string;
  content: string | number;
  createdAt: string;
}

export const createHead = (withWidth: boolean) => {
  const { t } = useTranslation('main');

  return {
    cells: [
      {
        key: 'id',
        content: 'id',
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'title',
        content: 'Title',
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'createdAt',
        content: 'Created At',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },

      {
        key: 'more',
        content: 'Actions',
      },
    ],
  };
};

const BoardListPage: FC = () => {
  const { t } = useTranslation('main');
  const [posts, setPosts] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //  state
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [suggestions, setSuggestions] = useRecoilState(setSuggestionState);
  const [showSuggestions, setShowSuggestions] = useRecoilState(setShowSuggestionState);

  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios
      .get('https://koreanjson.com/Posts')
      .then((response) => {
        setPosts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      });
  }, [setPosts]);

  // Calculate index of last and first post on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Ensure posts is an array
  const postArray = Array.isArray(posts) ? posts : [];

  // 달력 필터 함수
  const filtered = postArray.filter((content) => {
    const contentDate = new Date(content.createdAt);
    const start = startDate ? new Date(startDate) : new Date('1900-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return (
      content.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      contentDate >= start &&
      contentDate <= end
    );
  });

  // Slice the posts array to get the posts for the current page
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  // Create table head
  const head = createHead(true);

  const rows = currentPosts.map((contents: BoardList) => ({
    key: contents.id, // Use unique 'id' as key
    isHighlighted: false,
    cells: [
      {
        key: createKey(contents.id.toString()), // Convert 'id' to string
        content: contents.id,
        translate: `${t(`Id`)}`,
      },
      {
        key: createKey(contents.title),
        translate: `${t(`Title`)}`,

        content: (
          <Link to={`/PostDetail/${contents.id}`}>
            {contents.title.length > 20
              ? `${contents.title.slice(0, 20)}...`
              : contents.title}
          </Link>
        ),
      },
      {
        key: createKey(contents.createdAt),
        content: formDate(contents.createdAt) || 'N/A',
      },
      {
        key: `MoreDropdown-${contents.id}`, // Use unique key for dropdown
        content: (
          <Link to={`/PostDetail/${contents.id}`}>
            <Button>{t(`See`)}</Button>
          </Link>
        ),
      },
    ],
  }));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filtered.length / postsPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            cursor: 'pointer',
            backgroundColor: currentPage === i ? '#007bff' : '#fff',
            color: currentPage === i ? '#fff' : '#000',
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="px-[20px] md:px-[40px]">
      {/*검색창*/}
      <div className="mt-[50px] relative mb-[20px] inline-block w-[70%]">
        <input
          type="text"
          placeholder={t(`SearchContentTitle`)}
          value={searchTerm}
          onChange={(e) =>
            handleSearchTermChange(
              e,
              postArray,
              setSearchTerm,
              setSuggestions,
              setShowSuggestions
            )
          }
          className="p-[10px] inline-block  w-full border border-b-[1px] border-solid"
        />
        {/*자동완성기능*/}
        {showSuggestions && (
          <AutoComplete
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        )}
      </div>

      {/*날짜필터*/}
      <div className="date-filters mb-[20px]">
        <label>
          {t(`StartDate`)}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="cursor-pointer inline-block p-[10px] border border-b-[1px] border-solid"
          />
        </label>
        <label className="ml-[20px]">
          {t(`EndDate`)}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="cursor-pointer inline-block p-[10px] border border-b-[1px] border-solid"
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            {head.cells.map((cell) => (
              <th key={cell.key}>{cell.content}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell) => (
                <td key={cell.key}>{cell.content}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default BoardListPage;
