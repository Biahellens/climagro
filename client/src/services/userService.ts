import { User } from "@models/User";
import { header } from "@utils/header";
import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const UserService = {
  RegisterUser: async (user: User) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/user/createdAccount`;
      const token = localStorage.getItem("token");
      const httpHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response: AxiosResponse = await axios.post(API_URL, user, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }else {
        throw new Error("Não foi possível criar uma conta");
      }
    }
  },
  Login: async (email: string, password: string) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/user/login`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response: AxiosResponse = await axios.post(
        API_URL,
        {
          email: email,
          password: password,
        },
        {
          headers: httpHeaders,
        }
      );

      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (error) {
      throw new Error("Email ou senha incorretos");
    }
  },
  GetAll: async () => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/user/users`;
      const httpHeaders = header();
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Não foi possível obter os usuários");
    }
  },
};
