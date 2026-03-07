export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '5001', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret-change-me',
    accessExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN ?? '900', 10), // 15 min
    refreshExpiresIn: parseInt(
      process.env.JWT_REFRESH_EXPIRES_IN ?? '604800',
      10,
    ), // 7 days
  },

  grpc: {
    auth: {
      url: process.env.AUTH_GRPC_URL ?? 'localhost:50051',
    },
    product: {
      url: process.env.PRODUCT_GRPC_URL ?? 'localhost:50053',
    },
  },
});
