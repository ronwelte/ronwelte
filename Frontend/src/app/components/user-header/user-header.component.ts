import { Component, OnInit } from '@angular/core';
import { Store }             from "@ngrx/store";
import { Observable }        from "rxjs";

import { AppState }             from "../../interfaces";
import { logoutAction }         from "../../ui.actions";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  username$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.username$ = store.select(state => {
      return state.uiData.userName;
    });
  }

  ngOnInit(): void {
  }

  handleLogoutButton() {
    this.store.dispatch(logoutAction());
  }
}
