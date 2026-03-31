import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  cast: string;

  @Column()
  director: string;

  @Column()
  releaseDate: Date;

  @Column()
  genre: string;

  @Column()
  durationMin: number;

  @Column()
  country: string;

  @Column()
  language: string;

  @Column()
  image: string;

  @Column()
  actressId: number;
}
