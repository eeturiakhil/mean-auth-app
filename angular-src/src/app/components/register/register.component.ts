import { Component, OnInit } from "@angular/core";
import { log } from "util";
import { User } from "src/app/interfaces/user";
import { ValidateService } from "src/app/services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  first_name: String;
  last_name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private valdateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user: User = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required Fileds
    if (!this.valdateService.validateRegister(user)) {
      this.flashMessageService.show("Please fill in all the fields.", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      console.log("Please fill in all the fields.");
      return false;
    }

    // Validate Email
    if (!this.valdateService.validateEmail(user.email)) {
      this.flashMessageService.show("Please use a valid Email.", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      console.log("Please use a valid Email.");
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(
      (data: any) => {
        if (data.success) {
          this.flashMessageService.show(
            "You are now registered and can login.",
            {
              cssClass: "alert-success",
              timeout: 3000
            }
          );
          this.router.navigate(["/login"]);
        } else {
          this.flashMessageService.show("Something went wrong, try later.", {
            cssClass: "alert-danger",
            timeout: 3000
          });
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
