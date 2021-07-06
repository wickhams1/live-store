import { Product } from '../entities';

type ProductInput = Omit<Product, 'id' | 'availableQuantity'>;

export interface ProductsRepository {
  createProduct: (product: ProductInput) => Promise<Product>;
  findProduct: (id: string) => Promise<Product | undefined>;
  getProducts: () => Promise<Product[]>;
  updateProduct: (product: Product) => Promise<Product>;
}
