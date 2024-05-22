import { Device } from "@models/Device";
import { header } from "@utils/header";
import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const DeviceService = {
  Post: async (device: Device) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/device/createDevice`;
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
  AddCommand: async (deviceId: string, device: Device) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/device/${deviceId}/addCommands`;
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
      const API_URL = `${baseUrlApi.baseUrlApi}/device/allDevices`;
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
};