import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const apiUrlCities = process.env.REACT_APP_API_URL_CITIES;

// Интерфейс для списка городов
interface CityResponse {
  error: boolean;
  responceData: string[];
}

const CitiesPage: React.FC = () => {
  const navigate = useNavigate();

  // Функция для выполнения POST-запроса
  const fetchCities = async () => {
    const token = localStorage.getItem("token");
    const userKey = localStorage.getItem("userKey");

    if (!token || !userKey) {
      throw new Error("Ошибка аутентификации. Пожалуйста, войдите снова.");
    }

    const response = await axios.post<CityResponse>(
      `${apiUrlCities}`,
      {
        authToken: {
          authToken: token,
          parcelId: userKey,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.error) {
      throw new Error("Ошибка на сервере.");
    }

    if (!Array.isArray(response.data.responceData)) {
      throw new Error("Ошибка данных: список городов должен быть массивом.");
    }

    return response.data.responceData;
  };

  // Используем useQuery для выполнения запроса
  const {
    data: cities,
    error,
    isLoading,
    isError,
  } = useQuery<string[], Error>({
    queryKey: ["cities"], // Уникальный ключ для запроса
    queryFn: fetchCities, // Функция для выполнения запроса
    retry: false, // Отключаем повторные попытки при ошибке
  });

  // Обработка ошибок с помощью useEffect
  useEffect(() => {
    if (isError && error?.message === "Ошибка аутентификации. Пожалуйста, войните снова.") {
      navigate("/"); // Перенаправляем на страницу входа
    }
  }, [isError, error, navigate]);

  return (
    <div>
      <h2>Список городов</h2>
      {isError && <p style={{ color: "red" }}>{error.message}</p>}
      {isLoading && <p>Загрузка...</p>}
      <ul>
        {cities?.map((city: string, index: number) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;