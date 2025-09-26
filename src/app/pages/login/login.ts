import { Component, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = signal('');
  password = signal('');
  errorMessage = signal('');

  constructor(
    private readonly authService: Auth,
    private readonly router: Router
  ) {}

  onSubmit() {
    const success = this.authService.login(this.email(), this.password());

    if (success) {
      this.router.navigate(['/profil']);
    } else {
      this.errorMessage.set('Email ou mot de passe incorrect');
    }
  }

  updateEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
  }

  updatePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password.set(target.value);
  }
}
