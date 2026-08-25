export interface RegistrationFormData {
  name: string;
  email: string;
  businessCategory: string;
  phoneNumber: string;
  problemsToSolve: string;
  workSetup: 'I work alone' | 'I work with a team' | '';
  nationality: string;
  expectations: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  businessCategory?: string;
  phoneNumber?: string;
  problemsToSolve?: string;
  workSetup?: string;
  nationality?: string;
  expectations?: string;
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
