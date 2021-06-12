import { Product } from 'src/types/entities';
import { ProductsRepository } from 'src/types/repositories';
import { getConnection, getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Product as ProductEntity } from './entities';

const productsRepository: ProductsRepository = {
  createProduct: async ({ name }: Product) => {
    const product = new ProductEntity();
    product.id = v4();
    product.name = name;

    await getConnection().manager.save(product).then();

    return product;
  },
  findProduct: (id: string) => {
    return getConnection().manager.findOne(ProductEntity, id);
  },
  getProducts: () => {
    return getRepository(ProductEntity).find();
  },
  updateProduct: (product: Product) => {
    return getConnection().manager.save(product);
  },
};

export default productsRepository;
