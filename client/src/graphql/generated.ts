import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  product: Product;
};

export type ItemInput = {
  productId: Scalars['String'];
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  item?: Maybe<Item>;
};

export type ItemsListResponse = {
  __typename?: 'ItemsListResponse';
  items?: Maybe<Array<Item>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addProductsToCart?: Maybe<UserResponse>;
  createItem?: Maybe<ItemResponse>;
  createOrder?: Maybe<OrderResponse>;
  createOrderFromUserCart?: Maybe<UserResponse>;
  createProduct?: Maybe<ProductResponse>;
  createUser?: Maybe<UserResponse>;
};


export type MutationAddProductsToCartArgs = {
  userId: Scalars['String'];
  products: Array<ProductRelationInput>;
};


export type MutationCreateItemArgs = {
  item: ItemInput;
};


export type MutationCreateOrderArgs = {
  userId: Scalars['String'];
  products: Array<ProductRelationInput>;
};


export type MutationCreateOrderFromUserCartArgs = {
  userId: Scalars['String'];
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  items: Array<Item>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  order?: Maybe<Order>;
};

export type OrdersListResponse = {
  __typename?: 'OrdersListResponse';
  orders?: Maybe<Array<Order>>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['String'];
  name: Scalars['String'];
  availableQuantity: Scalars['Int'];
};

export type ProductInput = {
  name: Scalars['String'];
};

export type ProductRelationInput = {
  productId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  product?: Maybe<Product>;
};

export type ProductsListResponse = {
  __typename?: 'ProductsListResponse';
  products?: Maybe<Array<Maybe<Product>>>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  findItem?: Maybe<ItemResponse>;
  findOrder?: Maybe<OrderResponse>;
  findProduct?: Maybe<ProductResponse>;
  findUser?: Maybe<UserResponse>;
  findUserByEmailAddress?: Maybe<UserResponse>;
  getItems?: Maybe<ItemsListResponse>;
  getOrders?: Maybe<OrdersListResponse>;
  getProducts?: Maybe<ProductsListResponse>;
  getUserCart?: Maybe<ItemsListResponse>;
  getUserOrders?: Maybe<OrdersListResponse>;
};


export type QueryFindItemArgs = {
  id: Scalars['String'];
};


export type QueryFindOrderArgs = {
  id: Scalars['String'];
};


export type QueryFindProductArgs = {
  id: Scalars['String'];
};


export type QueryFindUserArgs = {
  id: Scalars['String'];
};


export type QueryFindUserByEmailAddressArgs = {
  emailAddress: Scalars['String'];
};


export type QueryGetItemsArgs = {
  productId?: Maybe<Scalars['String']>;
};


export type QueryGetUserCartArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserOrdersArgs = {
  userId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  productCreated: Product;
  productUpdated: Product;
  userUpdated: User;
};


export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  emailAddress: Scalars['String'];
  id: Scalars['String'];
  orders: Array<Order>;
  cart: Array<Item>;
};

export type UserInput = {
  name: Scalars['String'];
  emailAddress: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Item: ResolverTypeWrapper<Item>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ItemInput: ItemInput;
  ItemResponse: ResolverTypeWrapper<ItemResponse>;
  ItemsListResponse: ResolverTypeWrapper<ItemsListResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderResponse: ResolverTypeWrapper<OrderResponse>;
  OrdersListResponse: ResolverTypeWrapper<OrdersListResponse>;
  Product: ResolverTypeWrapper<Product>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ProductInput: ProductInput;
  ProductRelationInput: ProductRelationInput;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductsListResponse: ResolverTypeWrapper<ProductsListResponse>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Item: Item;
  String: Scalars['String'];
  ItemInput: ItemInput;
  ItemResponse: ItemResponse;
  ItemsListResponse: ItemsListResponse;
  Mutation: {};
  Order: Order;
  OrderResponse: OrderResponse;
  OrdersListResponse: OrdersListResponse;
  Product: Product;
  Int: Scalars['Int'];
  ProductInput: ProductInput;
  ProductRelationInput: ProductRelationInput;
  ProductResponse: ProductResponse;
  ProductsListResponse: ProductsListResponse;
  Query: {};
  Subscription: {};
  User: User;
  UserInput: UserInput;
  UserResponse: UserResponse;
  Boolean: Scalars['Boolean'];
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemResponse'] = ResolversParentTypes['ItemResponse']> = {
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemsListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemsListResponse'] = ResolversParentTypes['ItemsListResponse']> = {
  items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addProductsToCart?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationAddProductsToCartArgs, 'userId' | 'products'>>;
  createItem?: Resolver<Maybe<ResolversTypes['ItemResponse']>, ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'item'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'userId' | 'products'>>;
  createOrderFromUserCart?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateOrderFromUserCartArgs, 'userId'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'product'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderResponse'] = ResolversParentTypes['OrderResponse']> = {
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersListResponse'] = ResolversParentTypes['OrdersListResponse']> = {
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  availableQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsListResponse'] = ResolversParentTypes['ProductsListResponse']> = {
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  findItem?: Resolver<Maybe<ResolversTypes['ItemResponse']>, ParentType, ContextType, RequireFields<QueryFindItemArgs, 'id'>>;
  findOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<QueryFindOrderArgs, 'id'>>;
  findProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<QueryFindProductArgs, 'id'>>;
  findUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryFindUserArgs, 'id'>>;
  findUserByEmailAddress?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryFindUserByEmailAddressArgs, 'emailAddress'>>;
  getItems?: Resolver<Maybe<ResolversTypes['ItemsListResponse']>, ParentType, ContextType, RequireFields<QueryGetItemsArgs, never>>;
  getOrders?: Resolver<Maybe<ResolversTypes['OrdersListResponse']>, ParentType, ContextType>;
  getProducts?: Resolver<Maybe<ResolversTypes['ProductsListResponse']>, ParentType, ContextType>;
  getUserCart?: Resolver<Maybe<ResolversTypes['ItemsListResponse']>, ParentType, ContextType, RequireFields<QueryGetUserCartArgs, 'userId'>>;
  getUserOrders?: Resolver<Maybe<ResolversTypes['OrdersListResponse']>, ParentType, ContextType, RequireFields<QueryGetUserOrdersArgs, 'userId'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
  productCreated?: SubscriptionResolver<ResolversTypes['Product'], "productCreated", ParentType, ContextType>;
  productUpdated?: SubscriptionResolver<ResolversTypes['Product'], "productUpdated", ParentType, ContextType>;
  userUpdated?: SubscriptionResolver<ResolversTypes['User'], "userUpdated", ParentType, ContextType, RequireFields<SubscriptionUserUpdatedArgs, 'userId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  cart?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Item?: ItemResolvers<ContextType>;
  ItemResponse?: ItemResponseResolvers<ContextType>;
  ItemsListResponse?: ItemsListResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderResponse?: OrderResponseResolvers<ContextType>;
  OrdersListResponse?: OrdersListResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductsListResponse?: ProductsListResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
