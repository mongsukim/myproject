/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import React, { FC } from 'react';

// 자동완성 기능

export const AutoComplete: FC<{
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
          className="p-[10px] cursor-pointer border-b-[1px] hover:bg-amber-200"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};
