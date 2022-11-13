import {
  AiFillMail,
  AiFillHome,
  AiFillPhone,
  AiTwotoneStar,
  AiTwotoneDelete,
} from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { RiUserSearchFill } from 'react-icons/ri';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import UserInfo from '../user-info';
import UserAvatar from '../user-avatar';
import { deleteUser, toggleFavorite } from '../../store/actions/creators/app';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import styles from './style.module.css';

type Props = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  age: number;
  city: string;
  phoneNumber: string;
};

const UserCard = ({
  id,
  first_name,
  last_name,
  username,
  email,
  avatar,
  age,
  city,
  phoneNumber,
}: Props) => {
  const dispatch = useDispatch();

  const [isFavorite, setFavorite] = useState(false);

  const onStarClick = () => {
    setFavorite(!isFavorite);
    dispatch(toggleFavorite(id));
  };

  const onDeleteClick = () => {
    dispatch(deleteUser(id));
  };

  return (
    <figure id={id} className={styles.card} data-test-id='user-card'>
      <AiTwotoneDelete
        className={styles.deleteIcon}
        size="28"
        onClick={onDeleteClick}
        data-test-id='delete-button'
      />
      <AiTwotoneStar
        className={isFavorite ? styles.starActive : styles.star}
        size="28"
        onClick={onStarClick}
        data-test-id='favorite-button'
      />
      <div className={styles.row}>
        <UserInfo
          tooltipPosition="left"
          text={`${first_name} ${last_name}`}
          description="Name"
        >
          <FaRegUser className={styles.icon} />
        </UserInfo>
        <UserInfo tooltipPosition="right" text={city} description="City">
          <AiFillHome className={styles.icon} />
        </UserInfo>
      </div>
      <div className={styles.row}>
        <UserInfo tooltipPosition="top" text={email} description="Email">
          <AiFillMail className={styles.icon} />
        </UserInfo>
        <UserAvatar
          avatar={avatar}
          first_name={first_name}
          last_name={last_name}
        />
        <UserInfo tooltipPosition="right" text={age} description="Age">
          <BsFillCalendarDateFill className={styles.icon} />
        </UserInfo>
      </div>
      <div className={styles.row}>
        <UserInfo
          tooltipPosition="left"
          text={phoneNumber}
          description="Phone number"
        >
          <AiFillPhone className={styles.icon} />
        </UserInfo>
        <UserInfo
          tooltipPosition="right"
          text={username}
          description="username"
        >
          <RiUserSearchFill className={styles.icon} />
        </UserInfo>
      </div>
    </figure>
  );
};

export default UserCard;
