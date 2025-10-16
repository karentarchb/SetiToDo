import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User as FirebaseUser, updateProfile } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  public currentUser$: Observable<User | null>;
  private _currentUser: User | null = null;

  constructor(private auth: Auth) {
    this.currentUser$ = user(this.auth).pipe(
      map((firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          this._currentUser = this.mapFirebaseUser(firebaseUser);
          return this._currentUser;
        }
        this._currentUser = null;
        return null;
      })
    );
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, displayName?: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this._currentUser;
  }

  isAuthenticated(): boolean {
    return this._currentUser !== null;
  }

  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined
    };
  }
}
