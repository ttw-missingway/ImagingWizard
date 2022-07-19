import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Roster } from "../services/roster.service";
import { LoginRequest } from "../shared/loginResults";

@Component({
    selector: "login-page",
    templateUrl: "loginPage.component.html"
})
export class LoginPage {
    constructor(public roster: Roster, private router: Router){}

    public creds: LoginRequest =  {
        username: "",
        password: ""
    }

    public errorMessage = "";

    onLogin(){
        this.roster.login(this.creds)
            .subscribe({
                complete: () => {
                    this.router.navigate(['']);
                },
                error: () => this.errorMessage = "Failed to Login"
            });
    }
}