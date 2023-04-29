import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.api;
  constructor(private http: HttpClient) {}
  getJsonData() {
    return this.http.get('/assets/message.json');
  }
  postData(url: string, data: any) {
    return this.http.post(this.api + url, data);
  }
  getData(url: string) {
    return this.http.get(this.api + url);
  }
  getToken(): string {
    let token;
    const currentUser = JSON.parse(
      sessionStorage.getItem('currentUserToken') || ''
    );
    if (currentUser) {
      token = currentUser.token;
    }
    return token;
  }
  isAuthenticated() {
    let token;
    const data = sessionStorage.getItem('currentUserToken');
    if (data) {
      // Get the currnt user details from the local storage.
      const currentUser = JSON.parse(data);
      if (currentUser && currentUser.token) {
        // To check whether the current user is authenticated or not in online.
        token = currentUser.token;
        return token != null;
      }
    }
    return false;
  }
  getRefreshToken() {
    const currentUser = JSON.parse(
      sessionStorage.getItem('currentUserToken') || ''
    );
    const refreshToken = currentUser ? currentUser.refreshToken : null;
    return this.postData('refreshToken', { refreshToken });
  }
}
