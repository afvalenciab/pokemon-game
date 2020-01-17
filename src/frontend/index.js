import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './routes/App';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <App />
    </Router>
  </Provider>,
  document.getElementById('home')
);
