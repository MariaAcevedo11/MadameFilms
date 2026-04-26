// External imports
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Internal imports
import { Review } from 'src/reviews/entities/reviews.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  role: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column()
  image: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
