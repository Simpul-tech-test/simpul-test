import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Definisikan konfigurasi untuk instance axios
const axiosConfig: AxiosRequestConfig = {};

// Fungsi untuk membuat instance axios dengan baseURL yang berbeda
const createInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    ...axiosConfig,
    baseURL: baseURL,
  });
};

// Buat instance axios pertama dengan baseURL1
const instance1 = createInstance("https://be-diskaanj.vercel.app/api");

// Buat instance axios kedua dengan baseURL2
const instance2 = createInstance("https://crudcrud.com/api/68c886e29e2b43348e162bad4b9bd64f");

// Fungsi untuk membuat API wrapper dengan instance axios yang diberikan
const api = (axiosInstance: AxiosInstance) => {
  return {
    get<T>(url: string, config?: AxiosRequestConfig) {
      return axiosInstance.get<T>(url, config);
    },
    post<T>(url: string, body?: Record<string, any>, config?: AxiosRequestConfig) {
      return axiosInstance.post<T>(url, body, config);
    },
    patch<T>(
      url: string,
      body?: Record<string, any>,
      config?: AxiosRequestConfig
    ) {
      return axios.patch<T>(url, body, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig) {
      return axios.delete<T>(url, config);
    },
  };
};

export const api1 = api(instance1);

export const api2 = api(instance2);
