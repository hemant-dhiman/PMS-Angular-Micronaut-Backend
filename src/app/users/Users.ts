import { Address } from './address';
export interface Users {
  /**
   * Full name
   * Username
   * Email
   * Password
   * address
   */
  id: number;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  address: Address;
}
