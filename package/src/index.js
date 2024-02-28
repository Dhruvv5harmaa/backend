import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');

// Use createRoot from "react-dom/client" instead of "react-dom"
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);