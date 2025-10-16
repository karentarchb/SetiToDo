import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: false
})
export class AuthLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
