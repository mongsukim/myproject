// 테이블 cell 에 필요한 함수
export const createKey = (input: string) => {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
};
