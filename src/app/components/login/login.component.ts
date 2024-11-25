import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/']); // Redirect to home on success
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      () => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }

}
