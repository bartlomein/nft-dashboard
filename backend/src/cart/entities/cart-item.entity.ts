import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@ObjectType()
@Entity()
export class CartItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  contract: string;

  @Field()
  @Column()
  identifier: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
