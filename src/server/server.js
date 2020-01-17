import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import main from './routes/main';

dotenv.config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

if (ENV === 'development') {
  console.log(`Loading ${ENV} config`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colost: true },
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', main);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

