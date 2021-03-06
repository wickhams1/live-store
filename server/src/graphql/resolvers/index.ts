export { default as userResolver, Dependencies as UserResolverDependencies } from './userResolver';
export { default as itemResolver, Dependencies as ItemResolverDependencies } from './itemResolver';
export { default as productResolver, Dependencies as ProductResolverDependencies } from './productResolver';
export { default as orderResolver, Dependencies as OrderResolverDependencies } from './orderResolver';

export { Dependencies } from './resolversMap';
import resolvers from './resolversMap';

export default resolvers;
