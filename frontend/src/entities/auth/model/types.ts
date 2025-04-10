type Role = 'GENERAL' | 'LAWYER' | 'CERTIFIED_LAWYER' | null;

export interface AuthStore {
  isLogin: boolean;
  accessToken: string | null;
  clientId: number | null;
  role: Role;
  login: (token: string) => void;
  logout: () => void;
  setClientId: (id: number | null) => void;
  setRole: (role: Role) => void;
}

export interface MemberRole {
  memberId: number;
  role: Role;
  lawyerId: number | null;
}
