import {Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './shared/header/header';
import {Auth} from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularApp');

  currentUserEmail = computed(() => {
    const user = this.authService.currentUser();
    return user ? user.email : null;
  });

  constructor(private readonly authService: Auth) {}
}
