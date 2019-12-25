import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { log } from "util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(
      (data: any) => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessageService.show("you are now logged in", {
            cssClass: "alert-success",
            timeout: 5000
          });
          this.router.navigate(["/dashboard"]);
        } else {
          this.flashMessageService.show(data.msg, {
            cssClass: "alert-danger",
            timeout: 5000
          });
          this.router.navigate(["/login"]);
        }
      },
      err => {
        console.log("====================================");
        console.log("Error: " + JSON.stringify(err));
        console.log("====================================");
      }
    );
  }
}
