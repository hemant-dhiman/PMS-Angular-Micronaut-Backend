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
  fullName: string;
  userName: string;
  email: string;
  password: string;
  address: Address;
}
