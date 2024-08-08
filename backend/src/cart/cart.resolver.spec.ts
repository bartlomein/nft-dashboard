import { Test, TestingModule } from '@nestjs/testing';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

describe('CartResolver', () => {
  let resolver: CartResolver;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartResolver,
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn(),
            createCart: jest.fn(),
            addItemToCart: jest.fn(),
            removeItemFromCart: jest.fn(),
            deleteCart: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CartResolver>(CartResolver);
    service = module.get<CartService>(CartService);
  });

  describe('getCart', () => {
    it('should return a cart', async () => {
      const cartId = 1;
      const cart = { id: cartId, items: [] };
      jest.spyOn(service, 'getCart').mockResolvedValue(cart);

      const result = await resolver.getCart(cartId);
      expect(result).toEqual(cart);
      expect(service.getCart).toHaveBeenCalledWith(cartId);
    });
  });

  describe('createCart', () => {
    it('should create a new cart', async () => {
      const cart = { id: 1, items: [] };
      jest.spyOn(service, 'createCart').mockResolvedValue(cart);

      const result = await resolver.createCart();
      expect(result).toEqual(cart);
      expect(service.createCart).toHaveBeenCalled();
    });
  });

  describe('addItemToCart', () => {
    it('should add an item to the cart', async () => {
      const cartId = 1;
      const cart = { id: cartId, items: [] };
      jest.spyOn(service, 'addItemToCart').mockResolvedValue(cart);

      const result = await resolver.addItemToCart(
        cartId,
        'contract',
        'identifier',
      );
      expect(result).toEqual(cart);
      expect(service.addItemToCart).toHaveBeenCalledWith(
        cartId,
        'contract',
        'identifier',
      );
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an item from the cart', async () => {
      const cartId = 1;
      const cart = { id: cartId, items: [] };
      jest.spyOn(service, 'removeItemFromCart').mockResolvedValue(cart);

      const result = await resolver.removeItemFromCart(cartId, 'identifier');
      expect(result).toEqual(cart);
      expect(service.removeItemFromCart).toHaveBeenCalledWith(
        cartId,
        'identifier',
      );
    });
  });

  describe('deleteCart', () => {
    it('should delete a cart', async () => {
      const cartId = 1;
      const deleted = true;
      jest.spyOn(service, 'deleteCart').mockResolvedValue(deleted);

      const result = await resolver.deleteCart(cartId);
      expect(result).toEqual(deleted);
      expect(service.deleteCart).toHaveBeenCalledWith(cartId);
    });
  });
});
