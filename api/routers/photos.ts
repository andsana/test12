import express from 'express';
import Photo from '../models/Photo';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import { PhotoMutation } from '../types';

const photosRouter = express.Router();
photosRouter.get('/', async (req, res, next) => {
  let query = {};
  const userId = req.query.user;

  if (userId) {
    query = { user: userId };
  }

  try {
    const results = await Photo.find(query);
    return res.send(results);
  } catch (e) {
    return next(e);
  }
});
export default photosRouter;

photosRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const photoData: PhotoMutation = {
        user: req.user._id.toString(),
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };

      const photo = new Photo(photoData);
      await photo.save();

      res.send(photo);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

photosRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const photoId = req.params.id;

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).send({ error: 'Not found photo!' });
    }

    await photo.deleteOne();

    return res.send(photo);
  } catch (e) {
    return next(e);
  }
});
