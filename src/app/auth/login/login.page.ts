import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      await this.router.navigate(['/tabs']);
    } catch (error: any) {
      this.showError(this.getErrorMessage(error.code));
    } finally {
      this.isLoading = false;
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-credential': 'Credenciales inválidas'
    };

    return errorMessages[errorCode] || 'Error de autenticación. Intenta nuevamente';
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (emailControl?.hasError('email')) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
