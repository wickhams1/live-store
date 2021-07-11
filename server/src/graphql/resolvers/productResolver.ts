import { IResolvers } from 'graphql-tools';
import { MutationCreateProductArgs, QueryFindProductArgs, ProductResponse, ProductsListResponse } from '../generated';

import { ProductsService } from 'src/services';
import pubsub from '../pubsub';

export interface Dependencies {
  productsService: ProductsService;
}

const PRODUCT_CREATED = 'PRODUCT_CREATED';

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

      pubsub.publish(PRODUCT_CREATED, { productCreated: createdProduct });

      return { product: createdProduct };
    },
  },

  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator([PRODUCT_CREATED]),
    },
  },
});

export default ProductResolver;
