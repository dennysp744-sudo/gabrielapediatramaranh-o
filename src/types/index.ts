export type AppointmentType = 
  | 'puericultura'
  | 'neonatologia'
  | 'pediatria-geral'
  | 'prenatal-pediatrico'
  | 'urgencia-leve';

export interface AppointmentSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: AppointmentType;
}

export interface PatientAppointment {
  id: string;
  childName: string;
  childAge: string;
  childDob?: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  parentCpf: string;
  type: AppointmentType;
  date: string;
  time: string;
  paymentType: 'particular' | 'convenio-reembolso';
  notes?: string;
  status: 'confirmado' | 'pendente' | 'realizado' | 'cancelado';
  createdAt: string;
}

export interface GrowthRecord {
  id: string;
  childName: string;
  date: string;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  notes?: string;
}

export interface VaccineItem {
  id: string;
  ageLabel: string;
  name: string;
  diseaseTarget: string;
  notes: string;
  isMandatorySUS: boolean;
  isSBPRecommended: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'neonatologia' | 'alimentacao' | 'sono' | 'doencas-comuns' | 'vacinas' | 'desenvolvimento';
  readTimeMinutes: number;
  publishedDate: string;
  summary: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs?: string[];
      bulletPoints?: string[];
    }[];
    takeaways: string[];
    warningNote?: string;
  };
}

export interface PuericulturaMilestone {
  stageId: string;
  ageRange: string;
  title: string;
  badge: string;
  description: string;
  developmentGoals: string[];
  nutritionGuidelines: string[];
  sleepAndRoutine: string[];
  safetyAndHygiene: string[];
  frequentQuestions: { question: string; answer: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'consultas' | 'urgencias' | 'vacinas' | 'convenio';
}
