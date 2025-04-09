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

export interface LawyerTag {
  lawyer_specialties: string;
  description: string;
}

export interface TodayConsultations {
  scheduledTime: string;
  clientName: string;
  consultationType: string;
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

export interface LawyerProfile extends LawyerProfileUpdate {
  lawyerId: number;
  name: string;
  email: string;
  reviewCount: number;
  averageRating: number | null;
  lawyerTags: LawyerTag[];
  completedConsultationCount: number;
  todayConsultations: TodayConsultations[];
}

export interface LawyerProfileUpdate {
  phoneNumber: string;
  profileImage: string;
  officeName: string;
  officePhoneNumber: string;
  officeAddress: string;
  gender: string;
  specialties: LawyerSpeciality[];
  oneLineIntro: string;
  greetingMessage: string;
  introVideo: string;
  accountNumber: string;
  bankName: string;
  educations: Education[];
  careers: Career[];
  phoneConsultationPrice: number;
  videoConsultationPrice: number;
  visitConsultationPrice: number;
  lawyerLicenseNumber: string;
  lawyerLicenseExam: string;
}

export interface AvailabilityData {
  monday_start_time: string;
  monday_end_time: string;
  tuesday_start_time: string;
  tuesday_end_time: string;
  wednesday_start_time: string;
  wednesday_end_time: string;
  thursday_start_time: string;
  thursday_end_time: string;
  friday_start_time: string;
  friday_end_time: string;
  saturday_start_time: string;
  saturday_end_time: string;
  sunday_start_time: string;
  sunday_end_time: string;
}