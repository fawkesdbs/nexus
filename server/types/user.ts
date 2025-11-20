export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  company_name?: string | null;
  department?: string | null;
  role?: string | null;
  created_at: string;
  password_hash?: string; // Optional as it's often removed before returning
}