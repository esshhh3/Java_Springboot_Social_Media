import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./state/store.js";
import postReducer from "./state/Post/postSlice.js";
import messageReducer from "./state/Message/messageSlice.js";
import {BrowserRouter} from "react-router-dom";

// configuration of store
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    message: messageReducer
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
