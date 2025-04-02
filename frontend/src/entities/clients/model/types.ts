export interface ClientProfile {
  clientId: number;
  name: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  profileImage: string;
}

export interface ClientProfileUpdate {
  phoneNumber?: string;
  profileImage?: string;
}
