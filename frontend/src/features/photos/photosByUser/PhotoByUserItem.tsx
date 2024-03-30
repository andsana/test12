import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constants';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../../users/usersSlice';
import { useAppSelector } from '../../../app/hooks';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  title: string;
  userId: string;
  image: string;
  id: string;
  isLoading: boolean;
  onDelete: (id: string) => void;
  userID: string;
}

const PhotoByUserItem: React.FC<Props> = ({title, image, userId, id, onDelete, isLoading }) => {
  const cardImage = `${apiURL}/${image}`;

  const currentUser = useAppSelector(selectUser);
  const isOwner = (currentUser && currentUser._id === userId) || (currentUser && currentUser.role === 'admin');

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <div>
            <Link to={`/photos?user=${userId}`}>{title}</Link>
          </div>
          { isOwner && (
            <LoadingButton
              size='small'
              color='primary'
              onClick={() => onDelete(id)}
              loading={isLoading}
              loadingPosition='start'
              startIcon={<DeleteIcon />}
              variant='contained'
            >
              <span>Delete</span>
            </LoadingButton>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PhotoByUserItem;