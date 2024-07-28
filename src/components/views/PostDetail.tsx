import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@atlaskit/avatar';
import { Box, xcss } from '@atlaskit/primitives';
import Button from '@atlaskit/button/new';

const PostDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 날짜 형식을 YYYY-MM-DD로 변환하는 함수입니다.
  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // ISO 문자열에서 날짜 부분만 추출합니다.
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 비동기 데이터 fetching 함수
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await axios.all([
          axios.get(`https://koreanjson.com/posts/${id}`),
          axios.get(`https://koreanjson.com/comments?postId=${id}`),
        ]);

        setUser(postResponse.data); // 게시물 데이터 설정
        setComments(commentsResponse.data); // 댓글 데이터 설정
      } catch (error) {
        setError('Error fetching data'); // 에러 메시지 설정
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 데이터 fetching 호출
  }, [id]); // `id`가 변경될 때마다 데이터 fetching 수행

  // 댓글 수정
  useEffect(() => {
    axios
      .put(`https://koreanjson.com/comments/${id}`)
      .then((res) => console.log('res,res'))
      .catch((err) => console.log('err', err));
  }, []);

  if (loading) return <div>Loading...</div>; // 로딩 중 UI
  if (error) return <div>{error}</div>; // 에러 발생 시 UI

  return (
    <div>
      <h1>Post Detail</h1>
      {user && (
        <>
          <p>UserId: {user.UserId}</p>
          <p>Title: {user.title}</p>
          <p>Content: {user.content}</p>
          <p>Updated At: {formDate(user.updatedAt)}</p>
          <p>Created At: {formDate(user.createdAt)}</p>
        </>
      )}
      <h2>댓글 목록</h2>
      {comments.length === 0 ? '댓글이 없습니다.' : ''}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Avatar name={comment.id} size="medium" />
            <strong>{comment.author}</strong> {comment.content}
            <Button>댓글 수정</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
