export default () => ({
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 10,
      amountLimit: 1000,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      minify: false,
      soft: false,
      importOnBootstrap: false,
      customTypes: [],
      excludedTypes: [],
      excludedConfig: [
        "core-store.plugin_users-permissions_grant",
        "core-store.plugin_upload_metrics",
        "core-store.strapi_content_types_schema",
        "core-store.ee_information",
      ],
    },
  },
});
