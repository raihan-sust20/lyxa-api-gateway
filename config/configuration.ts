export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',

  jwt: {
    secret: process.env.JWT_SECRET ?? 'changeme',
    expiration: process.env.JWT_EXPIRATION ?? '3600s',
  },

  grpc: {
    auth: {
      url: process.env.AUTH_GRPC_URL ?? 'localhost:5001',
    },
    product: {
      url: process.env.PRODUCT_GRPC_URL ?? 'localhost:5002',
    },
  },
});
