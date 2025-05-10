import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setAuthToken, api } from "./config/api"; // adjust path if needed

import App from './App.jsx';
import './index.css';

// Reducers
import authReducer from './state/store.js';
import postReducer from './state/Post/postSlice.js';
import messageReducer from './state/Message/messageSlice.js';

// Store configuration
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    message: messageReducer,
  },
});

const token = localStorage.getItem("token");
setAuthToken(token);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/"; // or "/login"
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
