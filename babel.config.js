const path = require('path');

module.exports = function (api) {
  api.cache(true);

  const moduleResolverPlugin = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve('./')],
        alias: {
          '@': './',
        },
      },
    ],
  ];

  return {
    plugins: [...moduleResolverPlugin],
    presets: ['babel-preset-expo'],
  };
};
