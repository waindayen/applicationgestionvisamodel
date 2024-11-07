export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Visa {
  id: number;
  user_id: number;
  type: string;
  status: string;
  applicant_name: string;
  passport_number: string;
  created_at: string;
}