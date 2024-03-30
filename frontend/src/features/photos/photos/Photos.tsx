import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import PhotoItem from './PhotoItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPhotos, selectPhotosLoading } from '../photosSlise';
import { fetchPhotos } from '../photosThunks';
import { useEffect } from 'react';

const Photos = () => {
  const photos = useAppSelector(selectPhotos);
  const isLoadingPhotos = useAppSelector(selectPhotosLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

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
          <Typography variant='h4'>Photos</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2} flexWrap='wrap' direction='row'>
        {photos.map(photo => (
          <PhotoItem
            key={photo._id}
            title={photo.title}
            image={photo.image}
            displayName={photo.user.displayName}
            userId={photo.user._id}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Photos;