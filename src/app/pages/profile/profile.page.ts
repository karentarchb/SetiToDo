import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FeatureFlagService } from '../../core/services/feature-flag.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  showConfigurationCard: boolean = false;

  constructor(
    private authService: AuthService,
    private featureFlagService: FeatureFlagService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.showConfigurationCard = await this.featureFlagService.getFeatureFlagValue();
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
