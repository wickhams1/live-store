export class NoProductsError extends Error {
  constructor() {
    super('Orders require min 1 product');
  }
}

export class ProductsNotFoundError extends Error {
  constructor() {
    super('Some products in the request were not found');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}
