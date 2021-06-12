import { Product } from 'src/types/entities';
import { ProductsRepository, UsersRepository } from 'src/types/repositories';

export type CreateProduct = (product: Omit<Product, 'id'>) => Promise<Product>;

interface Dependencies {
  productsRepo: ProductsRepository;
  usersRepo: UsersRepository;
}

export const createProduct =
  ({ productsRepo }: Dependencies): CreateProduct =>
  (product) => {
    return productsRepo.createProduct(product);
  };

export type FindProduct = (id: string) => Promise<Product | undefined>;

export const findProduct =
  ({ productsRepo }: Dependencies): FindProduct =>
  (id) => {
    return productsRepo.findProduct(id);
  };

export type GetProducts = () => Promise<Product[]>;

export const getProducts =
  ({ productsRepo }: Dependencies): GetProducts =>
  () => {
    return productsRepo.getProducts();
  };

export type ProductsService = {
  createProduct: CreateProduct;
  findProduct: FindProduct;
  getProducts: GetProducts;
};

export const productsService = (dependencies: Dependencies): ProductsService => ({
  createProduct: createProduct(dependencies),
  findProduct: findProduct(dependencies),
  getProducts: getProducts(dependencies),
});
