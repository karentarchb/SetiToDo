import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.userName = currentUser?.displayName || currentUser?.email || null;
  }
}
