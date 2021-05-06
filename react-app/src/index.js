import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal"
import { BrowserRouter } from 'react-router-dom'
// import * as sessionActions from
// import './index.css';
import App from './App';
import configureStore from './store'

const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
//   authenticate();
//   window.store = store.sessionActions = sessionActions
// }

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
