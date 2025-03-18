import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

// import './LoginPage.css';

// интерфеймы на отправку
interface AuthForm {
  email: string;
  password: string;
}

// интерфейсы на получение
interface AuthResponse {
  userKey: string;
  token: string;
}

// урл для отправки 
const apiUrl = process.env.REACT_APP_API_URL;

// основная функция
const LoginPage: React.FC = () => {
  //изначально поля пустые, form хранит в себе нынешнее состояние полей
  //setForm обновляет состояние, 
  //AuthForm описывает интерфесы email и password, смотри выше
  const [form, setForm] = useState<AuthForm>({ email: "", password: "" });
  //аналогично, используем useState для обновления
  //error хранит в себе ошибки, изначчально равен null
  //setError позволяет обновлять состояние ошибки
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Обновление полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(apiUrl);
    try {
      const response = await axios.post<AuthResponse>(
        // "http://85.92.111.100/testbase/hs/parcelcloud/auth/login",
        `${apiUrl}`,
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Сохраняем токен и userKey
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userKey", response.data.userKey);

      // Переход на страницу с городами
      navigate("/main");
    } catch (err) {
      setError("Ошибка авторизации. Проверьте логин и пароль.");
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
