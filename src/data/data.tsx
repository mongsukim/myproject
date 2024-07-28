/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { css, jsx } from '@emotion/react';
import kebabCase from 'lodash/kebabCase';

import Avatar from '@atlaskit/avatar';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { Box, xcss } from '@atlaskit/primitives';
import { userListState } from '../atom/userListAtom';
import { lorem } from './lorem';

import axios from 'axios';
import { Link } from 'react-router-dom';

interface President {
  id: number;
  name: string;
  phone: string;
  province: string;
}

function createKey(input: string) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

function iterateThroughLorem(index: number) {
  return index > lorem.length ? index - lorem.length : index;
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
        key: 'name',
        content: 'Name',
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'province',
        content: 'Province',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'phone',
        content: 'Phone',
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

  useEffect(() => {
    axios
      .get('https://koreanjson.com/users')
      .then((response) => {
        console.log('response', response?.data);
        setPresidents(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.log(error));
  }, []);

  const head = createHead(true);

  const rows = Array.isArray(presidents)
    ? presidents.map((president: President, index: number) => ({
        key: kebabCase(president.name),
        isHighlighted: false,
        cells: [
          {
            key: createKey(president.name),
            content: (
              <NameWrapper>
                <AvatarWrapper>
                  <Avatar name={president.name} size="medium" />
                </AvatarWrapper>
                <Link to={`/profile/${president.id}`}>{president.name}</Link>
              </NameWrapper>
            ),
          },
          { key: createKey(president.province), content: president.province || 'N/A' },
          { key: createKey(president.phone), content: president.phone },
          {
            key: 'MoreDropdown',
            content: (
              <DropdownMenu trigger="More" label={`More about ${president.name}`}>
                <DropdownItemGroup>
                  <DropdownItem>{president.name}</DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
        ],
      }))
    : [];

  return (
    <div>
      <h1>유저 목록</h1>
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
    </div>
  );
};

export default DataTable;
