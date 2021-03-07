export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  access_token: string;
  refresh_token: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    social_number: string;
    company: Company;
  };
}
export interface Company {
  id: number;
  social_number: string;
  name: string;
}
export interface LoginError {
  detail: string;
}

export enum LoginErrors {
  WRONG_CREDENTIALS = 'user not found or wrong password',
}
export interface RefreshToken {
  access_token: string;
}
