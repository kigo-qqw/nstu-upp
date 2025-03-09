import type { AxiosInstance } from "axios";
import axios from "axios";
import tokenService from "~/services/token.service";

const httpClient = (baseApiUrl: string | null = null): AxiosInstance => {
  const client = axios.create({
    baseURL: baseApiUrl ?? "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    async (config) => {
      const token = tokenService.getLocalAccessToken();

      console.log(`token: ${token}`);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return client;
};

export class ApiService {
  private readonly httpClient: AxiosInstance;

  constructor(
    private readonly apiBaseUrl: string,
    service: string | null = null,
  ) {
    this.httpClient = httpClient(service);
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.httpClient.get(`${this.apiBaseUrl}/${url}`, {
      params,
    });

    console.log(
      `[API Service] GET ${this.apiBaseUrl}/${url} params=${JSON.stringify(params)} response=${JSON.stringify(response)}`,
    );

    return response.data as T;
  }

  async post<Req, Res>(url: string, data: Req): Promise<Res> {
    console.log(
      `[API Service] POST ${this.apiBaseUrl}/${url} data=${JSON.stringify(data)}}`,
    );

    const response = await this.httpClient.post<Res>(
      `${this.apiBaseUrl}/${url}`,
      data,
    );

    console.log(
      `[API Service] POST ${this.apiBaseUrl}/${url} response=${JSON.stringify(response)}`,
    );

    return response.data as Res;
  }

  async put<Req, Res>(url: string, data: Req): Promise<Res> {
    console.log(
      `[API Service] PUT ${this.apiBaseUrl}/${url} data=${JSON.stringify(data)}}`,
    );

    const response = await this.httpClient.put<Res>(
      `${this.apiBaseUrl}/${url}`,
      data,
    );

    console.log(
      `[API Service] PUT ${this.apiBaseUrl}/${url} response=${JSON.stringify(response)}`,
    );

    return response.data as Res;
  }
}
