import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users'; // URL for user data
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login function - authenticates against the backend (JSON-Server)
  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Store the user in localStorage
          this.currentUserSubject.next(user); // Update the currentUserSubject
        }
        return user; // Return user object (null if not found)
      })
    );
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); // Set the current user to null
  }

  // Get the current logged-in user
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserId():number{
    return this.currentUserValue.id
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
