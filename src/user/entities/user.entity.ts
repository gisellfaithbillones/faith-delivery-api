import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  LastName: string;

  @Column()
  email: string;

  @Column()
  mobileNumber: number;

  @Column()
  password: string;
}
