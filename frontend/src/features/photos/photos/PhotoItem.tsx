import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  title: string;
  userId: string;
  image: string;
  displayName: string;
}

const PhotoItem: React.FC<Props> = ({ title, image, displayName, userId }) => {
  const cardImage = `${apiURL}/${image}`;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} title={title} />
        <CardContent>
          <div>
            <Link to={`/photos?user=${userId}`}>{title}</Link>
          </div>
          <div>
            <Link to={`/photos?user=${userId}`}>By {displayName}</Link>
          </div>

        </CardContent>
      </Card>
    </Grid>
  );
};

export default PhotoItem;