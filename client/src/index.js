import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import loadUser from "./components/auth/loadUser";

loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
