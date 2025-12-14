import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from "virtual:pwa-register";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Определяем базовый путь для роутинга
const getBasename = () => {
  // Если на GitHub Pages, используем название репозитория
  if (window.location.hostname.includes('github.io')) {
    return '/CarDepreciationFrontend';
  }
  // Для локальной разработки - корень
  return '/';
};

// Регистрация Service Worker
if ("serviceWorker" in navigator) {
  registerSW()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)