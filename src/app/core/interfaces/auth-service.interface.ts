import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface IAuthService {
  currentUser$: Observable<User | null>;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string, displayName?: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
}
