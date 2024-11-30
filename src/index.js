import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import App from './App';
import store from './Store';
import client from './client';

/**
 * Init the service worker
 *
 * @return  void
 */
async function initServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register(`/service-worker-${client.buildId}.js`);
    console.info('Service worker registration successful:', registration);

    return registration;
  } catch (error) {
    console.error(`Service worker registration failed: ${error}`);

    return error;
  }
}

(async function start() {
  await initServiceWorker();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <App />
      </IntlProvider>
    </Provider>
  );
}());
