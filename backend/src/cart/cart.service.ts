import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async getCart(id: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async createCart(): Promise<Cart> {
    const cart = this.cartRepository.create();
    return this.cartRepository.save(cart);
  }

  async addItemToCart(
    cartId: number,
    contract: string,
    identifier: string,
  ): Promise<Cart> {
    const cart = await this.getCart(cartId);
    const cartItem = this.cartItemRepository.create({
      contract,
      identifier,
      cart,
    });
    cart.items.push(cartItem);
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }
  async removeItemFromCart(cartId: number, identifier: string): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.identifier === identifier,
    );
    if (itemIndex === -1) {
      throw new NotFoundException(
        `Item with ID ${identifier} not found in cart`,
      );
    }

    cart.items.splice(itemIndex, 1);
    await this.cartItemRepository.delete(identifier);
    return this.cartRepository.save(cart);
  }

  async deleteCart(id: number): Promise<boolean> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    await this.cartRepository.remove(cart);
    return true;
  }
}
