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

export enum LawyerSpeciality {
  NONE = 'NONE',
  ALL = 'ALL',
  차대차 = '차대차',
  차대보행자 = '차대보행자',
  차대자전거 = '차대자전거',
  차대이륜차 = '차대이륜차',
  고속도로 = '고속도로',
}

export interface LawyerProfileUpdate {
  phoneNumber: string;
  profileImage: string;
  officeName: string;
  officePhoneNumber: string;
  officeAddress: string;
  gender: string;
  oneLineIntro: string;
  greetingMessage: string;
  introVideo: string;
  educations: Education[];
  careers: Career[];
  // lawyerLicenseNumber: string;
  // lawyerLicenseExam: string | null;
  specialties: LawyerSpeciality[];
  phoneConsultationPrice: number;
  videoConsultationPrice: number;
  visitConsultationPrice: number;
  bankName?: string;
  accountNumber?: string;
}

// interface LawyerTag {
//   lawyer_specialties: string;
//   description: string;
// }
