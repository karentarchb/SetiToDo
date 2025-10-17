import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { emailValidator } from '../../core/validators/email.validator';

export function onlyTextValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const valid = /^[a-zA-Z\s]*$/.test(value);
    return valid ? null : { onlyText: 'Este campo solo acepta letras' };
  };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), onlyTextValidator()]],
      lastName: ['', [Validators.required, Validators.minLength(2), onlyTextValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator() });
  }

  private toPascalCase(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;

    const formValue = this.registerForm.value;
    const firstName = this.toPascalCase(formValue.firstName);
    const lastName = this.toPascalCase(formValue.lastName);
    const displayName = `${firstName} ${lastName}`;

    try {
      await this.authService.register(formValue.email, formValue.password, displayName);
      await this.router.navigate(['/tabs']);
    } catch (error: any) {
      this.showError(this.getErrorMessage(error.code));
    } finally {
      this.isLoading = false;
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
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
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/operation-not-allowed': 'Operación no permitida'
    };

    return errorMessages[errorCode] || 'Error al registrar usuario. Intenta nuevamente';
  }

  getFirstNameErrorMessage(): string {
    const firstNameControl = this.registerForm.get('firstName');
    if (firstNameControl?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (firstNameControl?.hasError('minlength')) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    if (firstNameControl?.hasError('onlyText')) {
      return 'El nombre solo puede contener letras';
    }
    return '';
  }

  // MODIFICADO: Se agrega el mensaje para el error 'onlyText'
  getLastNameErrorMessage(): string {
    const lastNameControl = this.registerForm.get('lastName');
    if (lastNameControl?.hasError('required')) {
      return 'El apellido es requerido';
    }
    if (lastNameControl?.hasError('minlength')) {
      return 'El apellido debe tener al menos 2 caracteres';
    }
    if (lastNameControl?.hasError('onlyText')) {
        return 'El apellido solo puede contener letras';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (emailControl?.hasError('invalidEmail')) {
      return 'Ingresa un correo válido que termine en .com';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Debes confirmar tu contraseña';
    }
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  isPasswordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return false;
    }

    return password === confirmPassword && confirmPassword.length >= 6;
  }
}
