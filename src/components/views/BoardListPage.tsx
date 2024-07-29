/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { Box, xcss } from '@atlaskit/primitives';
import { userListState } from '../../atom/userListAtom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@atlaskit/button/new';

interface BoardList {
  UserId: number;
  id: number;
  title: string;
  content: string | number;
  createdAt: string;
}

function createKey(input: string) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

const nameWrapperStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const NameWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <span css={nameWrapperStyles}>{children}</span>
);

const avatarWrapperStyles = xcss({
  marginInlineEnd: 'space.100',
});

const AvatarWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Box xcss={avatarWrapperStyles}>{children}</Box>
);

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

const AutoComplete: FC<{
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
}> = ({ suggestions, onSuggestionSelect }) => {
  return (
    <ul
      style={{
        border: '1px solid #ccc',
        maxHeight: '100px',
        overflowY: 'auto',
        position: 'absolute',
        zIndex: 1,
        background: '#fff',
        width: '100%',
      }}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSuggestionSelect(suggestion)}
          className="p-[10px] cursor-pointer border-b-[1px] hover:bg-amber-200

          "
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

const BoardListPage: FC = () => {
  const { t } = useTranslation('main');

  const [presidents, setPresidents] = useRecoilState(userListState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios
      .get('https://koreanjson.com/Posts')
      .then((response) => {
        console.log('response', response?.data);
        setPresidents(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      });
  }, [setPresidents]);

  // Calculate index of last and first post on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Ensure presidents is an array
  const presidentsArray = Array.isArray(presidents) ? presidents : [];

  // Filter posts based on search term and date range
  const filteredPresidents = presidentsArray.filter((content) => {
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
  const currentPosts = filteredPresidents.slice(indexOfFirstPost, indexOfLastPost);

  // Create table head
  const head = createHead(true);

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
  };

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
          <NameWrapper>
            <Link to={`/PostDetail/${contents.id}`}>
              {contents.title.length > 20
                ? `${contents.title.slice(0, 20)}...`
                : contents.title}
            </Link>
          </NameWrapper>
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
    for (let i = 1; i <= Math.ceil(filteredPresidents.length / postsPerPage); i++) {
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

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = presidentsArray
        .map((content) => content.title)
        .filter((title) => title && title.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
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
          onChange={handleSearchTermChange}
          className="p-[10px] inline-block  w-full border border-b-[1px] border-solid"
        />
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
