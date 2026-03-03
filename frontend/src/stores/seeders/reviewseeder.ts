import { moviesSeeder } from "./movieseeder";
import { userSeeder } from "./userseeder";

export const reviewSeeder = [
  {
    id: 1,
    rating: 5,
    comment: 'Amazing service!',
    date: new Date('2026-03-01'),
    user: userSeeder[0],
    movie: moviesSeeder[0]
  },
  {
    id: 2,
    rating: 4,
    comment: 'Very good experience.',
    date: new Date('2026-03-02'),
    user: userSeeder[1],
    movie: moviesSeeder[1]
  },
  {
    id: 3,
    rating: 3,
    comment: 'It was okay.',
    date: new Date('2026-03-03'),
    user: userSeeder[2],
    movie: moviesSeeder[2]
  }
];