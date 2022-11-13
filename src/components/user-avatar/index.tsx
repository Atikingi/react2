import { Loader } from '@alfalab/core-components/loader';
import React, { useState } from 'react';
import styles from './style.module.css';

type Props = {
  avatar: string;
  first_name: string;
  last_name: string;
};

const UserAvatar = ({ avatar, first_name, last_name }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.avatarWrapper}>
      <div style={{ display: imageLoaded ? 'none' : 'block' }}>
        <Loader />
      </div>
      <div style={{ display: imageLoaded ? 'block' : 'none' }}>
        <img
          className={styles.avatar}
          src={avatar}
          alt={`${first_name} ${last_name}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default UserAvatar;
