import { atom } from 'recoil';

export const searchTermState = atom({
  key: 'searchTermKey',
  default: '',
});

export const setSuggestionState = atom({
  key: 'suggestionKey',
  default: '',
});

export const setShowSuggestionState = atom({
  key: 'showKey',
  default: false,
});
