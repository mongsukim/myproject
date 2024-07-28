import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  console.log('id', id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://koreanjson.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Detail</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      {/* Add other user details as needed */}
    </div>
  );
};

export default UserDetail;
