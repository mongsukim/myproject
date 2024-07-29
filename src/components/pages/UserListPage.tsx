/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { FC, ReactNode, useEffect, useState } from 'react';
import Avatar from '@atlaskit/avatar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@atlaskit/button/new';
import { useTranslation } from 'react-i18next';
import { AutoComplete } from '../AutoComplete';

interface Users {
  id: number;
  name: string;
  phone: string;
  province: string;
}

function createKey(input: string) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

export const createHead = (withWidth: boolean) => {
  const { t } = useTranslation('main');

  return {
    cells: [
      {
        key: 'Name',
        content: `${t(`Name`)}`,
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'Province',
        content: `${t(`Province`)}`,
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'phone',
        content: `${t(`Phone`)}`,
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 10 : undefined,
      },
      {
        key: 'edit',
        content: `${t(`Edit`)}`,
      },
    ],
  };
};

const UserListPage: FC = () => {
  const { t } = useTranslation('main');

  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); // Set postsPerPage to 3

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    axios
      .get('https://koreanjson.com/users')
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      });
  }, [setUsers]);

  // Calculate index of last and first post on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Ensure users is an array
  const presidentsArray = Array.isArray(users) ? users : [];

  // Filter posts based on search term
  const filtered = presidentsArray.filter((president) =>
    president.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice the posts array to get the posts for the current page
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  // Create table head
  const head = createHead(true);

  const rows = currentPosts.map((president: Users) => ({
    key: president.id, // Use unique 'id' as key
    isHighlighted: false,
    cells: [
      {
        key: createKey(president.name),
        content: (
          <div className="flex items-center">
            <Avatar name={president.name} size="medium" />
            <Link to={`/UserDetail/${president.id}`}>{president.name}</Link>
          </div>
        ),
      },
      { key: createKey(president.province), content: president.province || 'N/A' },
      { key: createKey(president.phone), content: president.phone },
      {
        key: `MoreDropdown-${president.id}`, // Use unique key for dropdown
        content: (
          <Link to={`/UserDetail/${president.id}`}>
            <Button>Edit</Button>
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

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = presidentsArray
        .map((president) => president.name)
        .filter((name) => name && name.toLowerCase().includes(value.toLowerCase()));
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
      <div className="mt-[50px] relative mb-[20px] inline-block w-[70%]">
        <input
          type="text"
          placeholder={t(`SearchPlaceHolder`)}
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="p-[10px] w-full border border-b-[1px] border-solid"
        />
        {showSuggestions && (
          <AutoComplete
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        )}
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

export default UserListPage;
