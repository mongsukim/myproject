import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';

const PostDetail: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract date part from ISO string
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await axios.all([
          axios.get(`https://koreanjson.com/posts/${id}`),
          axios.get(`https://koreanjson.com/comments?postId=${id}`),
        ]);

        setUser(postResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = (commentId: number) => {
    setEditingCommentId(commentId === editingCommentId ? null : commentId);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    commentId: number
  ) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: event.target.value } : comment
    );
    setComments(updatedComments);
  };

  const handleSaveClick = async (commentId: number) => {
    const comment = comments.find((comment) => comment.id === commentId);
    if (comment) {
      try {
        await axios.put(`https://koreanjson.com/comments/${commentId}`, comment);
        setEditingCommentId(null);
      } catch (error) {
        console.error('Error updating comment:', error);
        setError('Error updating comment');
      }
    }
  };

  //게시글 수정

  const handleSaveContents = async (commentId: number) => {
    try {
      await axios.put(`https://koreanjson.com/posts/${id}`);
    } catch (error) {
      console.error('Error updating comment:', error);
      setError('Error updating comment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-[20px] md:px-[40px] lg:w-[800px] mx-auto">
      {user && (
        <>
          <div className="flex w-full justify-between mb-[40px] mt-[50px]">
            <p>Content Number: {user.UserId}</p>
            <div className="flex flex-col">
              <p>Updated At: {formDate(user.updatedAt)}</p>
              <p>Created At: {formDate(user.createdAt)}</p>
            </div>
          </div>
          <Heading size="xlarge">{user.title}</Heading>
          <hr className="my-[30px]" />
          <p>Content: {user.content}</p>
        </>
      )}

      <hr className="my-[30px]" />
      <div className="mb-[30px]">
        <Heading size="small">댓글 목록</Heading>
      </div>
      {comments.length === 0 ? '댓글이 없습니다.' : ''}

      <ul>
        {comments.map((comment) => (
          <li className="flex border-solid border-b-[1px] py-[10px]" key={comment.id}>
            <div className="flex items-center w-1/5">
              <Avatar name={comment.id.toString()} size="medium" />
              <div>유저번호:</div>
              <strong>{comment.UserId}</strong>
            </div>
            <div className="w-4/5">
              {editingCommentId === comment.id ? (
                <>
                  <input
                    className="inline-block outline outline-1 w-full "
                    value={comment.content}
                    onChange={(event) => handleCommentChange(event, comment.id)}
                  />
                  <Button onClick={() => handleSaveClick(comment.id)}>저장</Button>
                </>
              ) : (
                <div>{comment.content}</div>
              )}
            </div>
            <Button onClick={() => handleEditClick(comment.id)}>댓글 수정</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
