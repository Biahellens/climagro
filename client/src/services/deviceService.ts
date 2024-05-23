import { Device } from "@models/Device";
import { header } from "@utils/header";
import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const DeviceService = {
  Post: async (device: Device) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/devices/createDevice`;
      const httpHeaders = header();
      const response: AxiosResponse = await axios.post(API_URL, device, {
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
      } else {
        throw new Error("Não foi possível criar um dispositivo");
      }
    }
  },
  AddCommand: async (deviceId: number, device: Device) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/devices/${deviceId}/addCommands`;
      const httpHeaders = header()
      const response: AxiosResponse = await axios.put(API_URL, device, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Erro ao adicionar comandos");
    }
  },
  GetAll: async () => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/devices/allDevices`;
      const httpHeaders = header();
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Não foi possível obter os dispositivos");
    }
  },
  GetByUserId: async () => {
    try {
      const API_URL = `${baseUrlApi}/devices/getDevicesByUser`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Erro ao obter dispositivos");
    }
  },
  
  GetById: async (deviceId: number) => {
    try {
      const API_URL = `${baseUrlApi}/devices/getById/${deviceId}`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Erro ao obter dispositivo");
    }
  },
};
