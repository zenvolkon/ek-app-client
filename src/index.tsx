import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot из react-dom/client
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Parcels from './components/Parcels/Parcels';
import App from './App';

// Создаем клиент React Query
const queryClient = new QueryClient();

// Создаем корневой элемент
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Рендерим приложение
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);