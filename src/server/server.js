import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import axios from 'axios';
import main from './routes/main';

dotenv.config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
} else {
  console.log(`Loading ${ENV} config`);
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.get('/pokemon', async (req, res, next) => {
  console.log('Request Pokemon');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

app.get('/pokemon/:nameOrId', async (req, res, next) => {
  console.log('Request Pokemon by Name or Id');
  const { nameOrId } = req.params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

app.get('*', main);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

