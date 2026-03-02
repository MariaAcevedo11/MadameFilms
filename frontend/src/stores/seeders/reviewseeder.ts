import { userSeeder } from "./userseeder";

export const reviewSeeder = [
  {
    id: 1,
    rating: 5,
    comment: 'Amazing service!',
    date: new Date('2026-03-01'),
    user: userSeeder[0]
  },
  {
    id: 2,
    rating: 4,
    comment: 'Very good experience.',
    date: new Date('2026-03-02'),
    user: userSeeder[1]
  },
  {
    id: 3,
    rating: 3,
    comment: 'It was okay.',
    date: new Date('2026-03-03'),
    user: userSeeder[2]
  }
];