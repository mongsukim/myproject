import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';
import kebabCase from 'lodash/kebabCase';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { Box, xcss } from '@atlaskit/primitives';
import { userListState } from '../atom/userListAtom';
import Pagination from '@atlaskit/pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface President {
  UserId: number;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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
  return {
    cells: [
      {
        key: 'content',
        content: 'content',
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'createdAt',
        content: 'createdAt',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'updatedAt',
        content: 'updatedAt',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 10 : undefined,
      },
      {
        key: 'more',
        content: 'Actions',
        shouldTruncate: true,
      },
    ],
  };
};

const DataTable: FC = () => {
  const [presidents, setPresidents] = useRecoilState(userListState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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

  // Slice the posts array to get the posts for the current page
  const currentPosts = Array.isArray(presidents)
    ? presidents.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  // Create table head
  const head = createHead(true);

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
  };

  const rows = currentPosts.map((contents: President) => ({
    key: contents.id, // Use unique 'id' as key
    isHighlighted: false,
    cells: [
      {
        key: createKey(contents.title),
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
      { key: createKey(contents.updatedAt), content: formDate(contents.updatedAt) },
      {
        key: `MoreDropdown-${contents.id}`, // Use unique key for dropdown
        content: (
          <DropdownMenu trigger="More" label={`More about ${contents.title}`}>
            <DropdownItemGroup>
              <DropdownItem> </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        ),
      },
    ],
  }));

  const totalPages = Math.ceil(presidents.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <h1>게시글 목록</h1>
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
      <Pagination
        nextLabel="Next"
        label="Page"
        pageLabel="Page"
        pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
        previousLabel="Previous"
        onChange={(page) => handlePageChange(page)}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DataTable;
