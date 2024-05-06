
export default {
    //
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: false,
        depthLimit: 10,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
    menus: {
      config: {
        layouts: {
          menuItem: {
            link: [
              {
                input: {
                  label: 'Example Field Label',
                  name: 'example_field',
                  type: 'bool',
                },
                grid: {
                  col: 6,
                },
              },
            ],
            headline: [
              {
                input: {
                  label: 'Label',
                  name: 'leable',
                  type: 'text',
                },
              },
            ],
          },
        },
      },
    },
  };