export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    company_name?: string;
    department?: string;
    role?: string;
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}