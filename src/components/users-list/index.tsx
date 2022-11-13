import React, { useEffect } from 'react';
import UserCard from '../user-card';
import { Spinner } from '@alfalab/core-components/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserProps } from '../../store/reducers/types';
import { fetchData } from '../../store/actions/thunks/app';
import {
  getAllUsers,
  getFilteredStatus,
  getLoadingStatus,
} from '../../store/selectors/app';
import styles from './style.module.css';

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => getAllUsers(state));
  const isLoading = useSelector((state: RootState) => getLoadingStatus(state));

  const isFiltered = useSelector((state: RootState) =>
    getFilteredStatus(state)
  );

  useEffect(() => {
    dispatch(fetchData() as any);
  }, []);

  return (
    <div className={isLoading ? styles.loader : styles.container} data-test-id='users-list'>
      {isLoading ? (
        <Spinner visible={true} size="m" data-test-id='loader'/>
      ) : (
        users
          .filter((user) => (isFiltered ? user.favorite : user))
          .map(
            ({
              login,
              name,
              picture,
              email,
              dob,
              location,
              phone,
            }: UserProps) => (
              <UserCard
                key={login.uuid}
                id={login.uuid}
                first_name={name.first}
                last_name={name.last}
                email={email}
                avatar={picture.large}
                age={dob.age}
                city={location.city}
                phoneNumber={phone}
                username={login.username}
              />
            )
          )
      )}
    </div>
  );
};

export default UsersList;
