import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Photo from './models/Photo';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'photos'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user, test, _admin] = await User.create(
    {
      email: 'user@mail.local',
      displayName: 'user',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      image: 'fixtures/avatar.png',
    },
    {
      email: 'test@mail.local',
      displayName: 'test',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      image: 'fixtures/avatar.png',
    },
    {
      email: 'admin@mail.local',
      displayName: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      image: 'fixtures/avatar.png',
    },
  );

  await Photo.create(
    {
      user: user._id,
      title: 'blue Lagoon',
      image: 'fixtures/laguna.jpg',
    },
    {
      user: user._id,
      title: 'Margarita',
      image: 'fixtures/margarita.jpg',
    },
    {
      user: user._id,
      title: 'Mojito',
      image: 'fixtures/mojito.jpg',
    },
    {
      user: test._id,
      title: 'Scorpions',
      image: 'fixtures/scorpions.jpg',
    },
    {
      user: test._id,
      title: 'Nirvana',
      image: 'fixtures/nirvana.jpg',
    },
    {
      user: test._id,
      title: 'linkin-park',
      image: 'fixtures/linkin-park.jpg',
    },
  );

  await db.close();
};

void run();
