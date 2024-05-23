import { header } from "@utils/header";
import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";
import { Telnet } from "@models/Telnet";

export const TelnetService = {
  Post: async (telnet: Telnet) => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/telnet/postCommand`;
      const httpHeaders = header();
      const response: AxiosResponse = await axios.post(API_URL, telnet, {
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
};
