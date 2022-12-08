import { Component, OnInit } from "@angular/core";
import { Input }             from "@angular/core";
import { Observable }        from "rxjs";
import { Store }             from "@ngrx/store";
import { FormControl }       from "@angular/forms";
import { AppState }          from "../../interfaces";
import { Tamale }            from "../../interfaces";
import { Comment }           from "../../interfaces";
import * as UiActions        from "../../ui.actions";
import * as DataActions      from "../../data.actions";

@Component({
  selector: "app-tamale",
  templateUrl: "./tamale.component.html",
  styleUrls: ["./tamale.component.css"]
})
export class TamaleComponent implements OnInit {
  @Input() tamale!:  Tamale;
  @Input() userId:   number = 0;
  @Input() userName: string = ""
  listShowing$:      Observable<string>;
  comment = new FormControl("");

  constructor(private store: Store<AppState>) {
    this.listShowing$ = store.select(state => {
      return state.uiData.listShowing;
    });
  }

  ngOnInit(): void {
  }

  handleShowListButton(listName: string) {
    this.store.dispatch(UiActions.showListAction({listName: listName}));
  }

  handleHideButton() {
    this.store.dispatch(UiActions.hideListAction());
  }

  handleUpdateButton() {
    this.store.dispatch(UiActions.editTamaleAction({tamale: this.tamale!}));
  }

  handleDeleteButton() {
    this.store.dispatch(UiActions.deleteTamaleAction({tamale: this.tamale!}));
  }

  handleCommentSubmitButton() {
    const comment: Comment = {
      "text":     this.comment.value!,
      "userId":   this.userId,
      "userName": this.userName,
      "thingId":  this.tamale!.tamaleId
    };
    this.store.dispatch(DataActions.addTamaleCommentAction({data: comment}));
  }
}
