import { Component, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private readonly authService: Auth,
    private readonly router: Router
  ) {}

  onSubmit() {
    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.email() || !this.password()) {
      this.errorMessage.set('Veuillez remplir tous les champs');
      return;
    }

    const user: User = {
      email: this.email(),
      password: this.password()
    };

    const success = this.authService.register(user);

    if (success) {
      this.successMessage.set('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      this.errorMessage.set('');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.errorMessage.set('Un utilisateur avec cet email existe déjà');
      this.successMessage.set('');
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

  updateConfirmPassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.confirmPassword.set(target.value);
  }
}
