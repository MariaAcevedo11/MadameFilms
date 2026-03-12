import { moviesSeeder } from './movieseeder';
import { userSeeder } from './userseeder';

export const reviewSeeder = [
  {
    id: 1,
    rating: 5,
    comment: 'Amazing service!',
    date: new Date(),
    userId: 0,
    movieId: 0, 
  },
  {
    id: 2,
    rating: 4,
    comment: 'Very good experience.',
    date: new Date(),
    userId: 1,
    movieId: 1,
  },
  {
    id: 3,
    rating: 3,
    comment: 'It was okay.',
    date: new Date(),
    userId: 2,
    movieId: 2,
  },
];
