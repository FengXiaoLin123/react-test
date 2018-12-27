// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
// Import root app
import App from './App';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore(initialState, history);
// console.log(store, 'store')
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', './App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/zh.js'),
    ])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}
