import { moviesSeeder } from './movieseeder';
import { userSeeder } from './userseeder';

export const reviewSeeder = [
  {
    id: 1,
    rating: 5,
    comment: 'Amazing service!',
    date: new Date(),
    user: userSeeder,
    movie: moviesSeeder,
  },
  {
    id: 2,
    rating: 4,
    comment: 'Very good experience.',
    date: new Date(),
    user: userSeeder,
    movie: moviesSeeder,
  },
  {
    id: 3,
    rating: 3,
    comment: 'It was okay.',
    date: new Date(),
    user: userSeeder,
    movie: moviesSeeder,
  },
];
