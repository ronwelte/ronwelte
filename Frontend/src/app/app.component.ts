import { Component, OnInit }  from '@angular/core';
import { Store }              from '@ngrx/store';
import { Observable }         from "rxjs";
import { AppState }           from './interfaces';
import { loadRestaurantList } from './data.actions';
import { incAction }          from './ui.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'map4';
  userId$: Observable<number>;

  constructor(private store: Store< AppState >) {
    this.userId$ = store.select(state => {
      return state.uiData.userId;
    });
  }

  ngOnInit(): void {
//    this.store.dispatch(loadRestaurantList());
  }
}
