export interface Education {
  school: string;
  degree: string;
  graduationYear: number;
}

export interface Career {
  company: string;
  position: string;
  years: string;
}

export interface LawyerTags {
  lawyer_specialties: string;
  description: string;
}

export interface TodayConsultations {
  scheduledTime: string;
  clientName: string;
  consultationType: string;
}

export interface LawyerProfile {
  lawyerId: number;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  officeName: string;
  officePhoneNumber: string;
  officeAddress: string;
  gender: string; // 남성 or 여성
  oneLineIntro: string;
  greetingMessage: string;
  reviewCount: number;
  averageRating: number | null;
  introVideo: string; // url
  education: Education[];
  career: Career[];
  lawyerLicenseNumber: string;
  lawyerLicenseExam: string | null;
  lawyerTags: LawyerTags[];
  completedConsultationCount: number;
  todayConsultations: TodayConsultations[];
  phoneConsultationPrice: number;
  videoConsultationPrice: number;
  visitConsultationPrice: number;
}

export interface LawyerProfileUpdate {
  phoneNumber?: string;
  profileImage?: string;
  officeName?: string;
  officePhoneNumber?: string;
  officeAddress?: string;
  gender?: string;
  oneLineIntro?: string;
  specialties?: LawyerTags[];
  greetingMessage?: string;
  introVideo?: string;
  accountNumber?: string;
  bankName?: string;
  educations?: Education[];
  careers?: Career[];
  phoneConsultationPrice?: number;
  videoConsultationPrice?: number;
  visitConsultationPrice?: number;
}
