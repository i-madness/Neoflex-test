import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/layout/Layout';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import { ENDPOINT_CONNECT } from './reducers/film-entry-actions';

store.dispatch({ type: ENDPOINT_CONNECT });

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
