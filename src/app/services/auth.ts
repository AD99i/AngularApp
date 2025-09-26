import { Injectable, signal } from '@angular/core';
import { User, LoggedUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private currentUserSignal = signal<LoggedUser | null>(null);
  private registeredUsersSignal = signal<User[]>([]);

  constructor() {
    this.loadStoredData();
  }

  private loadStoredData() {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }

    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      this.registeredUsersSignal.set(JSON.parse(storedUsers));
    }
  }

  public get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  public get isLoggedIn() {
    return this.currentUserSignal() !== null;
  }

  login(email: string, password: string): boolean {
    const registeredUsers = this.registeredUsersSignal();
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const loggedUser: LoggedUser = {
        email: user.email,
        token: 'fake-jwt-token-' + Date.now()
      };

      sessionStorage.setItem('currentUser', JSON.stringify(loggedUser));
      this.currentUserSignal.set(loggedUser);
      return true;
    }

    return false;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  register(user: User): boolean {
    const registeredUsers = this.registeredUsersSignal();

    if (registeredUsers.find(u => u.email === user.email)) {
      return false;
    }

    const updatedUsers = [...registeredUsers, user];
    this.registeredUsersSignal.set(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    return true;
  }
}
