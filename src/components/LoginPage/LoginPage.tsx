import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Интерфейсы
interface AuthForm {
  email: string;
  password: string;
}

interface AuthResponse {
  userKey: string;
  token: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<AuthForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Функция запроса авторизации
  const loginMutation = useMutation<AuthResponse, Error, AuthForm>({
    mutationFn: async (formData) => {
      const response = await axios.post<AuthResponse>(`${apiUrl}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userKey", data.userKey);
      navigate("/main");
    },
    onError: () => {
      setError("Ошибка авторизации. Проверьте логин и пароль.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(form);
  };

  return (
    <div>
      <h2>Авторизация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;