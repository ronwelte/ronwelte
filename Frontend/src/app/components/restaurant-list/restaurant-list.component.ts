import { Component, OnInit }  from "@angular/core";
import { Observable }         from "rxjs";
import { of, map }            from "rxjs";
import { Store }              from "@ngrx/store";
import { DataService }        from "../../data.service";
import { loadRestaurantList } from "../../data.actions";
import { Restaurant }         from "../../interfaces";
import { Location }           from "../../interfaces";
import { Tamale }             from "../../interfaces";
import { AppState }           from "../../interfaces";

@Component({
  selector: "app-restaurant-list",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent implements OnInit {
  list$:      Observable<Restaurant[]>;
  formState$: Observable<string>;

  constructor(private store:       Store< AppState >,
              private dataService: DataService) {
    this.list$ = store.select(state => {
      return state.uiData.restaurants;
    });
    this.formState$ = store.select(state => {
      return state.uiData.formState;
    });
  }

  ngOnInit(): void { }

}
