import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Actress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  nationality: string;

  @Column({ type: 'text' })
  biography: string;

  @Column({ type: 'text' })
  movies: string;

  @Column()
  image: string;

  @OneToMany(() => Movie, (movie) => movie.actress)
  movie: Movie;
}
