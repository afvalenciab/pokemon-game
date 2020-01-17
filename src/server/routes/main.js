import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers';
import render from '../render';

const main = (req, res, next) => {
  try {
    const store = createStore(reducer);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} conext={{}}>
          {renderRoutes(Routes())}
        </StaticRouter>
      </Provider>
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (error) {
    next(error);
  }
};

export default main;