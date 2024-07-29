import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';
import { useTranslation } from 'react-i18next';

const UserDetail = () => {
  const { t } = useTranslation('main');

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    axios
      .get(`https://koreanjson.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setEditUser(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .put(`https://koreanjson.com/users/${id}`, editUser)
      .then(() => {
        setUser(editUser); // 서버 응답이 아닌 입력한 데이터를 그대로 user 상태에 적용
        setIsEditing(false);
        alert('유저정보 수정요청 https://koreanjson.com/users/${id}을 보냈습니다.');
      })
      .catch((error) => console.error('Error updating user data:', error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="my-[50px] px-[20px] md:px-[40px] lg:w-[800px] mx-auto">
      <Heading size="xlarge">{t(`UserDetail`)}</Heading>
      <div className="py-[20px]">
        <hr />
      </div>
      {isEditing ? (
        <div>
          <label>
            {t(`Name`)}:
            <input
              className="border border-1 inline-block px-[5px]"
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            {t(`Email`)}:
            <input
              className="border border-1 inline-block px-[5px]"
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            {t(`Phone`)}:
            <input
              className="border border-1 inline-block px-[5px]"
              type="text"
              name="phone"
              value={editUser.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            {t(`WebSite`)}:
            <input
              className="border border-1 inline-block px-[5px]"
              type="text"
              name="website"
              value={editUser.website}
              onChange={handleChange}
            />
          </label>
          <br />
          <div className="flex space-x-[10px]">
            <Button onClick={handleSave}>{t(`Save`)}</Button>
            <Button onClick={() => setIsEditing(false)}>{t(`Cancel`)}</Button>
          </div>
        </div>
      ) : (
        <div className=" ">
          <div>
            <span className="inline-block w-[70px]">{t(`Name`)}:</span>
            {user.name}
          </div>
          <div>
            <span className="inline-block w-[70px]">{t(`Email`)}:</span>
            {user.email}
          </div>
          <div>
            <span className="inline-block w-[70px]">{t(`Phone`)}:</span>
            {user.phone}
          </div>
          <div>
            <span className="inline-block w-[70px]"> {t(`WebSite`)}:</span>
            {user.website}
          </div>
          <Button onClick={() => setIsEditing(true)}>{t(`Edit`)}</Button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
