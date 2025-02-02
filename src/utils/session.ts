import router from "../router";
import { AuthContextType } from "../guards/auth.context.ts";

const SESSION_TOKEN = 'QIMA_SESSION';

export const getSession = (): AuthContextType | null => {
  const session = localStorage.getItem(SESSION_TOKEN);

  if (session) {
    return JSON.parse(session);
  }

  return null;
};

export const setSession = (token: string) => {
  if (token) {
    localStorage.setItem(SESSION_TOKEN, JSON.stringify(token));
  }
};

export const removeSession = () => {
  localStorage.removeItem(SESSION_TOKEN);
  router.navigate('/login', { replace: true });
};