import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';

describe('CartResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  it('should create a new cart', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createCart {
              id
            }
          }
        `,
      });
    console.log('response', response.body.data);
    expect(response.body.data.createCart).toBeDefined();
    expect(response.body.data.createCart.id).toBeDefined();
  });

  it('should add an item to the cart', async () => {
    const createCartResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createCart {
              id
            }
          }
        `,
      });
    const cartId = createCartResponse.body.data.createCart.id;

    const addItemResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            addItemToCart(cartId: ${cartId}, name: "Item 1", price: 10.5, quantity: 2) {
              id
              items {
                id
                name
                price
                quantity
              }
            }
          }
        `,
      });

    expect(addItemResponse.body.data.addItemToCart).toBeDefined();
    expect(addItemResponse.body.data.addItemToCart.items.length).toBe(1);
    expect(addItemResponse.body.data.addItemToCart.items[0].name).toBe(
      'Item 1',
    );
    expect(addItemResponse.body.data.addItemToCart.items[0].price).toBe(10.5);
    expect(addItemResponse.body.data.addItemToCart.items[0].quantity).toBe(2);
  });

  it('should remove an item from the cart', async () => {
    const createCartResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createCart {
              id
            }
          }
        `,
      });
    const cartId = createCartResponse.body.data.createCart.id;

    const addItemResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            addItemToCart(cartId: ${cartId}, name: "Item 1", price: 10.5, quantity: 2) {
              id
              items {
                id
                name
              
              }
            }
          }
        `,
      });
    const itemId = addItemResponse.body.data.addItemToCart.items[0].id;

    const removeItemResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeItemFromCart(cartId: ${cartId}, itemId: ${itemId}) {
              id
              items {
                id
                name
              
              }
            }
          }
        `,
      });

    expect(removeItemResponse.body.data.removeItemFromCart).toBeDefined();
    expect(removeItemResponse.body.data.removeItemFromCart.items.length).toBe(
      0,
    );
  });

  it('should delete the cart', async () => {
    const createCartResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createCart {
              id
            }
          }
        `,
      });
    const cartId = createCartResponse.body.data.createCart.id;

    const deleteCartResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            deleteCart(id: ${cartId})
          }
        `,
      });

    expect(deleteCartResponse.body.data.deleteCart).toBe(true);
  });
});
