import {
  AppActionTypes,
  AppFetchError,
  AppFetchStarted,
  AppFetchSuccess,
  ClearData,
  DeleteUser,
  FilteredData,
  ToggleFavorite,
} from '../actions/types/app';
import { UserProps } from './types';

type ActionsProps =
  | AppFetchStarted
  | AppFetchSuccess
  | AppFetchError
  | DeleteUser
  | ClearData
  | ToggleFavorite
  | FilteredData;

export type StateProps = {
  loading: boolean;
  error: string | null;
  data: UserProps[];
  filtered: boolean;
};

const initialState: StateProps = {
  loading: false,
  error: null,
  data: [],
  filtered: false,
};

export default function appReducer(
  state = initialState,
  action: ActionsProps
): StateProps {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case AppActionTypes.FETCH_DATA_SUCCESS: {
      return <StateProps>{
        ...state,
        error: null,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    }
    case AppActionTypes.FETCH_DATA_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case AppActionTypes.CLEAR_DATA: {
      return {
        ...state,
        data: [],
      };
    }
    case AppActionTypes.DELETE_USER: {
      return {
        ...state,
        data: state.data.filter((user) => user.login.uuid !== action.payload),
      };
    }
    case AppActionTypes.TOGGLE_FAVORITE: {
      return {
        ...state,
        data: state.data.map((user) =>
          user.login.uuid === action.payload
            ? {
                ...user,
                favorite: !user.favorite,
              }
            : user
        ),
      };
    }
    case AppActionTypes.DATA_FILTERED: {
      return {
        ...state,
        filtered: !state.filtered,
      };
    }
    default:
      return state;
  }
}
