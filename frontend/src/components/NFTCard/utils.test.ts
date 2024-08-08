import { ShoppingCartT } from "@/store/shoppingCart";
import { isInCart } from "./utils";

describe("isInCart", () => {
  it("returns true if the item is in the cart", () => {
    const cart: ShoppingCartT = {
      id: 1,
      items: [
        { contract: "0x1", identifier: "123" },
        { contract: "0x2", identifier: "456" },
      ],
    };
    expect(isInCart("0x1", "123", cart)).toBe(true);
    expect(isInCart("0x2", "456", cart)).toBe(true);
  });

  it("returns false if the item is not in the cart", () => {
    const cart: ShoppingCartT = {
      id: 1,
      items: [
        { contract: "0x1", identifier: "123" },
        { contract: "0x2", identifier: "456" },
      ],
    };
    expect(isInCart("0x3", "789", cart)).toBe(false);
    expect(isInCart("0x1", "456", cart)).toBe(false);
  });

  it("returns false if the cart is null", () => {
    expect(isInCart("0x1", "123", null)).toBe(undefined);
  });

  it("returns false if the cart has no items", () => {
    const emptyCart: ShoppingCartT = { id: 1, items: [] };
    expect(isInCart("0x1", "123", emptyCart)).toBe(undefined);
  });
});
