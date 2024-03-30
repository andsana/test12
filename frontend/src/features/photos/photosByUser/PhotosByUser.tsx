import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDeleteLoading, selectPhotos, selectPhotosLoading } from '../photosSlise';
import { deletePhoto, fetchPhotos } from '../photosThunks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoByUserItem from './PhotoByUserItem';
import { selectUser } from '../../users/usersSlice';

const PhotosByUser = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('user');
  const photos = useAppSelector(selectPhotos);
  const isLoadingPhotos = useAppSelector(selectPhotosLoading);
  const isLoadingDelete = useAppSelector(selectDeleteLoading);
  const user = useAppSelector(selectUser);

  const photo = photos.find(photo => photo.user._id === userID);

  useEffect(() => {
    if (userID) {
      dispatch(fetchPhotos(userID));
    }
  }, [dispatch, userID]);

  const handleDelete = (id: string) => {
    if (user && confirm('Are you sure you want to delete this artist?')) {
      dispatch(deletePhoto(id));
    }
  };

  if (!userID) {
    return <p>not found</p>
  }

  if (isLoadingPhotos) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h4'>{photo && photo.user.displayName}</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2} flexWrap='wrap' direction='row'>
        {photos.map(photo => (
          <PhotoByUserItem
            key={photo._id}
            title={photo.title}
            image={photo.image}
            userId={photo.user._id}
            onDelete={() => handleDelete(photo._id)}
            isLoading={photo.user._id === isLoadingDelete}
            id={photo._id}
            userID={userID}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PhotosByUser;