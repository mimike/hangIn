import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal"
import { BrowserRouter } from 'react-router-dom' // provides users  a single-page application experience

// import * as sessionActions from
// import './index.css';
import App from './App';
import configureStore from './store'

const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
//   authenticate();
//   window.store = store.sessionActions = sessionActions
// }

// index.html line 31. this is the first thing react hits after
// 2 arguments: App component is going to be attached to the element, 'root'

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
