import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  nationality: string;

  @Column('text')
  biography: string;

  @Column()
  movies: string;

  @Column()
  image: string;
}
