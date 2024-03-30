import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, Photo } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import axios from 'axios';

export const fetchPhotos = createAsyncThunk<Photo[], string | undefined>(
  'photos/fetchAll',
  async (userId?: string) => {
    let url = '/photos';

    if (userId) {
      url += `?user=${userId}`;
    }

    const response = await axiosApi.get<Photo[]>(url);
    return response.data;
  });

export const deletePhoto = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: GlobalError }
>('photos/delete', async (photoId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.delete(`/photos/${photoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    thunkAPI.dispatch(fetchPhotos());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});


