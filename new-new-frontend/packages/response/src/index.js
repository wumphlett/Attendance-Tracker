import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './common/interceptors/axios'
import 'typeface-roboto'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

