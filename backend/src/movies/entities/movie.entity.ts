import { Actress } from 'src/actresses/entities/actress.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  RelationId,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'text' })
  cast: string;

  @Column({ type: 'text' })
  director: string;

  @CreateDateColumn()
  releaseDate: Date;

  @Column({ type: 'text' })
  genre: string;

  @Column({ type: 'int' })
  durationMin: number;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  language: string;

  @Column()
  image: string;

  @ManyToOne(() => Actress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'actressId' })
  actress: Actress;

  @RelationId((movie: Movie) => movie.actress)
  actressId: number;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
