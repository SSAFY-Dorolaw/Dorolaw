export interface AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  clientId: number | null;
  login: (token: string) => void;
  logout: () => void;
  setClientId: (id: number | null) => void;
}
