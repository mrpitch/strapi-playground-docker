export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')
    }
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
