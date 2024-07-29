import React from 'react';

export const handleSearchTermChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  postArray,
  setSearchTerm,
  setSuggestions,
  setShowSuggestions
) => {
  const value = e.target.value;
  setSearchTerm(value);
  if (value.length > 0) {
    const filteredSuggestions = postArray
      .map((content) => content.title)
      .filter((title) => title && title.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  } else {
    setShowSuggestions(false);
  }
};
