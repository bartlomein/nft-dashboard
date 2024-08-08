import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './cart.service';
import { Repository } from 'typeorm';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    cartItemRepository = module.get<Repository<CartItem>>(
      getRepositoryToken(CartItem),
    );
  });

  describe('getCart', () => {
    it('should return a cart with its items', async () => {
      const cartId = 1;
      const cart = { id: cartId, items: [] };
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);

      const result = await service.getCart(cartId);
      expect(result).toEqual(cart);
      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId },
        relations: ['items'],
      });
    });
  });

  describe('createCart', () => {
    it('should create a new cart', async () => {
      const cart = { id: 1, items: [] };
      jest.spyOn(cartRepository, 'create').mockReturnValue(cart);
      jest.spyOn(cartRepository, 'save').mockResolvedValue(cart);

      const result = await service.createCart();
      expect(result).toEqual(cart);
      expect(cartRepository.create).toHaveBeenCalled();
      expect(cartRepository.save).toHaveBeenCalledWith(cart);
    });
  });

  describe('addItemToCart', () => {
    it('should add an item to the cart', async () => {
      const cartId = 1;
      const cart = { id: cartId, items: [] };
      const cartItem = {
        id: 1,
        contract: 'contract',
        identifier: 'identifier',
        cart,
      };

      jest.spyOn(service, 'getCart').mockResolvedValue(cart);
      jest.spyOn(cartItemRepository, 'create').mockReturnValue(cartItem);
      jest.spyOn(cartItemRepository, 'save').mockResolvedValue(cartItem);
      jest.spyOn(cartRepository, 'save').mockResolvedValue(cart);

      const result = await service.addItemToCart(
        cartId,
        'contract',
        'identifier',
      );
      expect(result).toEqual(cart);
      expect(service.getCart).toHaveBeenCalledWith(cartId);
      expect(cartItemRepository.create).toHaveBeenCalledWith({
        contract: 'contract',
        identifier: 'identifier',
        cart,
      });
      expect(cartItemRepository.save).toHaveBeenCalledWith(cartItem);
      expect(cartRepository.save).toHaveBeenCalledWith(cart);
    });
  });
});
