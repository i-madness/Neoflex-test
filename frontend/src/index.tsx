import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Layout />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
