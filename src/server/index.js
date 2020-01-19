require('ignore-styles');
require('@babel/polyfill');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('asset-require-hook') ({
  extensions: ['jpg', 'png', 'gif', 'svg'],
  name: '/assets/static/[hash].[ext]',
});

require('./server.js');