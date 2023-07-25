import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}> {/* Wrap your App with Provider and pass store */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
