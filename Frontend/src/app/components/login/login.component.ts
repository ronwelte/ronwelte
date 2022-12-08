import { Component, OnInit } from "@angular/core";
import { FormControl }       from "@angular/forms";
import { Store }             from "@ngrx/store";
import { Observable }        from "rxjs";

import { AppState }             from "../../interfaces";
import { LoginData }            from "../../interfaces";
import { loginAction }          from "../../data.actions";
import { loginFailAcknowledge } from "../../ui.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = new FormControl("");
  password = new FormControl("");
  userId$:      Observable<number>;
  loginFailed$: Observable<boolean>;
  isSpinning$:  Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.userId$ = store.select(state => {
      return state.uiData.userId;
    });
    this.loginFailed$ = store.select(state => {
      return state.uiData.loginFailed;
    });
    this.isSpinning$ = store.select(state => {
      return state.uiData.isSpinning;
    });
  }

  ngOnInit(): void {
  }

  isSubmitDisabled() {
    return this.whatsWrong() != "";
  }

  isLoginFailed() {
    let flag: boolean = false;
    this.loginFailed$.subscribe(x => flag = x);
    return flag;
  }

  whatsWrong() {
    if (!this.username.value || this.username.value.trim().length === 0) {
      return "Username cannot be blank";
    }
    if (!this.password.value || this.password.value.trim().length === 0) {
      return "Password cannot be blank";
    }

    if (this.isLoginFailed()) {
      return "Login attempt failed.";
    }

    return "";
  }


  submit() {
    const data: LoginData = {
      username: this.username?.value!.trim(),
      password: this.password?.value!.trim(),
      status:   "none",
      userId:   0
    }

    this.store.dispatch(loginAction(data));
  }

  handleLoginFailedOkayButton() {
    this.store.dispatch(loginFailAcknowledge());
  }
}
