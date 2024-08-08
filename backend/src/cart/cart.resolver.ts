import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => Cart)
  getCart(@Args('cartId', { type: () => Int }) cartId: number): Promise<Cart> {
    return this.cartService.getCart(cartId);
  }

  @Mutation(() => Cart)
  createCart(): Promise<Cart> {
    return this.cartService.createCart();
  }

  @Mutation(() => Cart)
  addItemToCart(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('contract') contract: string,
    @Args('identifier') identifier: string,
  ): Promise<Cart> {
    return this.cartService.addItemToCart(cartId, contract, identifier);
  }

  @Mutation(() => Cart)
  removeItemFromCart(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('identifier', { type: () => String }) identifier: string,
  ): Promise<Cart> {
    return this.cartService.removeItemFromCart(cartId, identifier);
  }

  @Mutation(() => Boolean)
  deleteCart(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.cartService.deleteCart(id);
  }
}
