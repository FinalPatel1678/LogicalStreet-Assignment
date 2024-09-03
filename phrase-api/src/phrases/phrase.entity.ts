import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phrase: string;

  @Column({
    type: 'enum',
    enum: ['active', 'pending', 'spam', 'deleted'],
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column('json', { nullable: true })
  translations: Record<string, string>;
}
