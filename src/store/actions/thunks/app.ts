import axios from 'axios';
import {
  fetchAppStarted,
  fetchAppSuccess,
  fetchAppError,
} from '../creators/app';
import { Dispatch } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants/constants';
import { UserProps } from '../../reducers/types';

export const fetchData = () => async (dispatch: Dispatch) => {
  dispatch(fetchAppStarted());

  try {
    axios.get(`${API_URL}?results=6`).then(({ data }) => {
      data.results.map((user: UserProps) => (user.favorite = false));
      dispatch(fetchAppSuccess(data.results));
    });
  } catch (error) {
    dispatch(fetchAppError(error));
  }
};
