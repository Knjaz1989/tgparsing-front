import { ApiRoutes } from './apiRoutes';
import {
  LoginData,
  RegistrationRequestData,
  RegistrationResponseData,
} from '../../types/auth';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { User } from '../../types/user';

export const register = createAppAsyncThunk<
  RegistrationResponseData,
  RegistrationRequestData
>(
  ApiRoutes.Register,
  async (registrationData, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<RegistrationResponseData>(
        ApiRoutes.Register,
        registrationData,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const login = createAppAsyncThunk<User, LoginData>(
  ApiRoutes.Login,
  async (loginData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(ApiRoutes.Login, loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAppAsyncThunk(
  ApiRoutes.Logout,
  async (_, { extra: api, rejectWithValue }) => {
    try {
      await api.post(ApiRoutes.Logout);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const refresh = createAppAsyncThunk<User, void>(
  ApiRoutes.Refresh,
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<User>(ApiRoutes.Refresh);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const patchUser = createAppAsyncThunk<User, FormData>(
  ApiRoutes.PatchUser,
  async (updatedUser, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.patch<User>(ApiRoutes.PatchUser, updatedUser);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
