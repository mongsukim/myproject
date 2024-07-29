// 날짜를 0000-00-00 로 변환해주는 함수

export const formDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
};
