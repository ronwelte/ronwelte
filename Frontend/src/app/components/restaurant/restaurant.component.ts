import { Component, OnInit } from "@angular/core";
import { Store }             from "@ngrx/store";
import { Input }             from "@angular/core";
import { Observable }        from "rxjs";
import { FormControl }       from "@angular/forms";
import { Restaurant }        from "../../interfaces";
import { Tamale }            from "../../interfaces";
import { Comment }           from "../../interfaces";
import { AppState }          from "../../interfaces";
import * as UIActions        from "../../ui.actions";
import * as DataActions      from "../../data.actions";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.css"]
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant?: Restaurant;
  listShowing$: Observable<string>;
  comment        = new FormControl("");
  userId:   number = 0;
  userName: string = "";

  constructor(private store: Store<AppState>) {
    this.listShowing$ = store.select(state => {
      this.userId   = state.uiData.userId;
      this.userName = state.uiData.userName;
      return state.uiData.listShowing;
    });
  }

  ngOnInit(): void {
  }


  handleShowListButton(listName: string) {
    this.store.dispatch(UIActions.showListAction({listName: listName}));
  }

  handleHideButton() {
    this.store.dispatch(UIActions.hideListAction());
  }

  addTamaleButton() {
    this.store.dispatch(UIActions.addTamaleAction({ restaurantId: this.restaurant!.restaurantId}));
    return;
  }

  handleCommentSubmitButton() {
    const newComment: Comment = {
      "text":     this.comment.value!,
      "userId":   this.userId,
      "userName": this.userName,
      "thingId":  this.restaurant!.restaurantId
    };
    this.store.dispatch(DataActions.addRestaurantCommentAction({data: newComment}));
  }
}
