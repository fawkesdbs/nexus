export interface Employee {
    id: string; // Changed from number to string for UUID
    company_name: string | null;
    first_name: string;
    last_name: string;
    gender: string | null;
    email: string;
    phone_number: string | null;
    department: string | null;
    employee_number: string | null;
    role: string | null;
    profile_picture?: string | null; // Added
    created_at: string;
}