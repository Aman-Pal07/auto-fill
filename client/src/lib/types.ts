// Types for API responses and components

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  currentPosition?: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  website?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Profile {
  id: number;
  userId: number;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  customFields?: Record<string, any>;
  completionPercentage: number;
}

export interface Resume {
  id: number;
  userId: number;
  filename: string;
  fileContent: string;
  isDefault: boolean;
  createdAt: string;
}

export interface FormHistory {
  id: number;
  userId: number;
  site: string;
  positionTitle?: string;
  fieldsAttempted: number;
  fieldsCompleted: number;
  status: 'success' | 'partial' | 'failed';
  timestamp: string;
  details?: {
    fields?: string[];
    error?: string;
  };
}

export interface ExtensionSettings {
  id: number;
  userId: number;
  autoFillOnLoad: boolean;
  showNotifications: boolean;
  saveFormHistory: boolean;
  fieldMappings?: Record<string, Record<string, string>>;
}

export interface WeeklyStats {
  applicationsFilled: number[];
  successRates: number[];
}

export interface Statistics {
  id: number;
  userId: number;
  applicationsFilled: number;
  successRate: number;
  formsDetected: number;
  timeSaved: number;
  weeklyStats?: WeeklyStats;
}

export interface Stat {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  iconColor: string;
}

export interface ExtensionData {
  profile: Profile;
  settings: ExtensionSettings;
  defaultResume?: Resume;
}

export interface ExtensionField {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface FieldStat {
  name: string;
  percentage: number;
}
