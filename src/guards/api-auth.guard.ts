import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getSession } from '../utils/session';

const onRequest = (config: InternalAxiosRequestConfig) => {
  const session = getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
};

const resolveUnauthorizedAccess = (error: { response: { status: number; }; }) => {
  return Promise.reject(error);
};


function ApiAuthGuard(client: AxiosInstance) {
  client.interceptors.request.use((config) => onRequest(config));

  client.interceptors.response.use(
      (response) => response,
      (error) => resolveUnauthorizedAccess(error),
  );

  return client;
}

export default ApiAuthGuard;
