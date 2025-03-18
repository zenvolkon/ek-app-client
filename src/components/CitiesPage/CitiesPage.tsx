import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './CitiesPage.css';

const apiUrlCities = process.env.REACT_APP_API_URL_CITIES
// Интерфейс для списка городов
interface CityResponse {
  error: boolean;
  responceData: string[];
}

const CitiesPage: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = localStorage.getItem("token");
        const userKey = localStorage.getItem("userKey");

        if (!token || !userKey) {
          setError("Ошибка аутентификации. Пожалуйста, войдите снова.");
          navigate("/");
          return;
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

        console.log("Ответ API:", response.data);

        if (response.data.error) {
          setError("Ошибка на сервере.");
          return;
        }

        if (!Array.isArray(response.data.responceData)) {
          setError("Ошибка данных: список городов должен быть массивом.");
          return;
        }

        setCities(response.data.responceData);
      } catch (err) {
        setError("Не удалось загрузить список городов.");
      }
    };

    fetchCities();
  }, [navigate]);

  return (
    <div>
      <h2>Список городов</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;
