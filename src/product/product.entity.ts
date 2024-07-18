import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({nullable: true})
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: string;
}
