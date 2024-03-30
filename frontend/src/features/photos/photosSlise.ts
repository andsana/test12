import { Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deletePhoto, fetchPhotos } from './photosThunks';

interface PhotosState {
  items: Photo[];
  current: Photo | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
  deletePhotoLoading: false | string;
}

const initialState: PhotosState = {
  items: [],
  current: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
  deletePhotoLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchLoading = false;
      state.items = photos;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deletePhoto.pending, (state, { meta }) => {
      state.deletePhotoLoading = meta.arg;
    });
    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.deletePhotoLoading = false;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deletePhotoLoading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.items;
export const selectPhotosLoading = (state: RootState) => state.photos.fetchLoading;
export const selectPhotoCreating = (state: RootState) => state.photos.createLoading;
export const selectOnePhoto = (state: RootState) => state.photos.current;
export const selectOnePhotoFetching = (state: RootState) => state.photos.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.photos?.deletePhotoLoading;
