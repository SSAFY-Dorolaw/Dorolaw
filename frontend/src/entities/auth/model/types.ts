export interface AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  clientId: number | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
  setClientId: (id: number | null) => void;
  setRole: (role: string | null) => void;
}

export interface MemberRole {
  memberId: number;
  role: string;
  lawyerId: number | null;
}
