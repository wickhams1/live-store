import { IResolvers } from 'graphql-tools';
import { MutationCreateProductArgs, QueryFindProductArgs, ProductResponse, ProductsListResponse } from '../generated';

import { ProductsService } from 'src/services/productsService';

export interface Dependencies {
  productsService: ProductsService;
}

const ProductResolver = ({
  productsService: { createProduct, findProduct, getProducts },
}: Dependencies): IResolvers => ({
  Query: {
    async findProduct(_: void, { id }: QueryFindProductArgs): Promise<ProductResponse> {
      const product = await findProduct(id);
      return product ? { product: product } : {};
    },
    async getProducts(): Promise<ProductsListResponse> {
      const products = await getProducts();
      return { products };
    },
  },

  Mutation: {
    async createProduct(_: void, { product }: MutationCreateProductArgs): Promise<ProductResponse> {
      const createdProduct = await createProduct(product);
      return { product: createdProduct };
    },
  },
});

export default ProductResolver;
