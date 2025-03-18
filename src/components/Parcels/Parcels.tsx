import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Интерфейс для данных о накладных
interface Invoice {
  number: string;
  customer: string;
  sendCity: string;
  recCity: string;
  sendAddress: string;
  recAddress: string;
  qt: number;
  weight: number;
  volume: number;
  price: number;
  sendCompany: string;
  recCompany: string;
  date: string;
  statusType: string;
  statusValue: string;
  statusDate: string;
  id: string;
}

// Интерфейс для ответа от сервера
interface ApiResponse {
  error: boolean;
  responceData: Invoice[];
}

// Функция для получения данных о накладных
const fetchInvoices = async (): Promise<ApiResponse> => {
  const userKey = localStorage.getItem('userKey'); // Получаем userKey из локального кэша
  const token = localStorage.getItem('token'); // Получаем token из локального кэша

  if (!userKey || !token) {
    throw new Error('UserKey or Token not found in local storage');
  }

  const response = await axios.post<ApiResponse>(
    'http://85.92.111.100/testbase/hs/parcelcloud/parcels/get',
    {
      authToken: {
        userKey,
        token,
      },
      filters: {
        recCities: null,
        sendCities: null,
        number: null,
      },
    }
  );

  return response.data;
};

const Parcels: React.FC = () => {
  // Используем объект конфигурации для useQuery
  const { data, error, isLoading } = useQuery<ApiResponse, Error>({
    queryKey: ['invoices'], // Ключ запроса
    queryFn: fetchInvoices, // Функция для выполнения запроса
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Накладные</h1>
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Клиент</th>
            <th>Город отправления</th>
            <th>Город получения</th>
            <th>Адрес отправления</th>
            <th>Адрес получения</th>
            <th>Количество</th>
            <th>Вес</th>
            <th>Объем</th>
            <th>Цена</th>
            <th>Компания отправления</th>
            <th>Компания получения</th>
            <th>Дата</th>
            <th>Тип статуса</th>
            <th>Значение статуса</th>
            <th>Дата статуса</th>
          </tr>
        </thead>
        <tbody>
          {data?.responceData.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.number}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.sendCity}</td>
              <td>{invoice.recCity}</td>
              <td>{invoice.sendAddress}</td>
              <td>{invoice.recAddress}</td>
              <td>{invoice.qt}</td>
              <td>{invoice.weight}</td>
              <td>{invoice.volume}</td>
              <td>{invoice.price}</td>
              <td>{invoice.sendCompany}</td>
              <td>{invoice.recCompany}</td>
              <td>{invoice.date}</td>
              <td>{invoice.statusType}</td>
              <td>{invoice.statusValue}</td>
              <td>{invoice.statusDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Parcels;