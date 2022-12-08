import { Component, OnInit } from "@angular/core";
import { Input }             from "@angular/core";
import { Store }             from "@ngrx/store";

import { AppState }             from "../../interfaces";
import { Rating }               from "../../interfaces";
import { RestaurantRatingData } from "../../interfaces";
import { TamaleRatingData }     from "../../interfaces";
import * as Actions             from "../../data.actions";

@Component({
  selector: "app-rating-editor",
  templateUrl: "./rating-editor.component.html",
  styleUrls: ["./rating-editor.component.css"]
})
export class RatingEditorComponent implements OnInit {
  @Input() thingName: string   = "Type of thing being rated.  Tamale or Restaurant";
  @Input() thingId:   number   = 0;
  @Input() userId:    number   = 0;
  @Input() ratings:   Rating[] = [];
  

  isOpen:           boolean = false;
  userHasRatedThis: boolean = false;
  userRating:       number  = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.ratings) {
      for (let rating of this.ratings) {
        if (rating.userId == this.userId) {
          this.userHasRatedThis = true;
          this.userRating       = rating.rating;
          break;
        }
      }
    }
  }

  wow(rating: number) {
    this.userRating = rating;
  }

  handleSubmit() {
    //
    // Dispatch an appropriate action base upon Restaurant rating or
    // Tamale rating and whether we need to insert or update.
    //
    // If the user already has a rating for this restaurant, UPDATE it
    // otherwise INSERT one.
    // Refresh the data.
    //
    if (this.thingName == "Restaurant") {
      const ratingData: RestaurantRatingData = {
        rating:       this.userRating,
        userId:       this.userId,
        restaurantId: this.thingId
      }
      if (this.userHasRatedThis) {
        this.store.dispatch(Actions.updateRestaurantRating(ratingData));
      } else {
        this.store.dispatch(Actions.addRestaurantRating(ratingData));
      }
    } else {
      const ratingData: TamaleRatingData = {
        rating:   this.userRating,
        userId:   this.userId,
        tamaleId: this.thingId
      }
      if (this.userHasRatedThis) {
        this.store.dispatch(Actions.updateTamaleRating(ratingData));
      } else {
        this.store.dispatch(Actions.addTamaleRating(ratingData));
      }
    }
  }
}
