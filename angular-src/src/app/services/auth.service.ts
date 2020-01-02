import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../interfaces/user";
import { Globals } from "../globals";
import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private globals: Globals) {}

  registerUser(user: User) {
    return this.http.post(
      `${this.globals.localApiUrl}/users/register`,
      user,
      this.getRequestHeaders()
    );
    // return this.http.post(`users/register`, user, this.getRequestHeaders());
  }

  authenticateUser(user) {
    return this.http.post(
      `${this.globals.localApiUrl}/users/authenticate`,
      user,
      this.getRequestHeaders()
    );
    // return this.http.post(`users/authenticate`, user, this.getRequestHeaders());
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    let options = { headers: headers };
    return this.http.get(`${this.globals.localApiUrl}/users/profile`, options);
    // return this.http.get(`users/profile`, options);
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getRequestHeaders() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    return options;
  }
}
