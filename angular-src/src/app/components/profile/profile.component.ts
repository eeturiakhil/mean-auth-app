import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (data: any) => {
        this.user = data.user;
      },
      err => {
        this.flashMessageService.show("You are not Authorized to this Page", {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.authService.logout();
        this.router.navigate(["/login"]);
      }
    );
  }
}
