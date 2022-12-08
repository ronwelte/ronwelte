import { Component, OnInit } from "@angular/core";
import { Observable }        from "rxjs";
import { tap }               from "rxjs/operators";
import { Store }             from "@ngrx/store";
import { FormControl }       from "@angular/forms";

import { AppState }          from "../../interfaces";
import { Tamale }            from "../../interfaces";
import * as UIActions        from "../../ui.actions";
import * as DataActions      from "../../data.actions";

@Component({
  selector:    "app-tamale-editor",
  templateUrl: "./tamale-editor.component.html",
  styleUrls:   ["./tamale-editor.component.css"]
})
export class TamaleEditorComponent implements OnInit {
  name        = new FormControl("");
  rating      = new FormControl("");
  price       = new FormControl("");
  filling     = new FormControl("");
  description = new FormControl("");

  restaurantId: number  = 0;
  tamaleId:     number  = 0;
  mode:         string  = ""; // Add, Edit, Delete
  tamale?:      Tamale;
  formState$:   Observable<string>;
  userId$:      Observable<number>;

  constructor(private store: Store<AppState>) {
    this.formState$ = store.select(state => {
      return state.uiData.formState;
    });
    this.userId$ = store.select(state => {
      return state.uiData.userId;
    });
    store.select("uiData").subscribe(substate => {
      this.mode          = substate.formState;
      this.tamale        = substate.tamale;
      if (substate.formState == "Hidden") {
        return;
      }

      if (substate.formState == "AddTamale") {
        this.setComponentToAddMode();
        this.tamaleId     = 0;
        this.restaurantId = substate.formRestaurantId!;
      }
      if (substate.formState == "EditTamale") {
        this.setPriceEditMode(substate.tamale!);
        this.tamaleId     = substate.tamale!.tamaleId;
        this.restaurantId = substate.tamale!.restaurantId;
      }
      if (substate.formState == "DeleteTamale") {
        this.setComponentToDeleteMode(substate.tamale!);
        this.tamaleId     = substate.tamale!.tamaleId;
        this.restaurantId = substate.tamale!.restaurantId;
      }
    });
  }

  ngOnInit(): void {
  }

  setComponentToAddMode() {
    this.name.enable();
    this.price.enable();
    this.rating.enable();
    this.filling.enable();
    this.description.enable();
  }

  setPriceEditMode(tamale: Tamale) {
    this.name.disable();
    this.name.setValue(tamale.tamaleName);
    this.price.setValue(tamale.tamalePrice);
    this.rating.disable();
    this.rating.setValue("" + tamale.tamaleRating);
    this.filling.disable();
    this.filling.setValue(tamale.tamaleFilling);
    this.description.disable();
    this.description.setValue(tamale.tamaleDescription);
  }

  setComponentToDeleteMode(tamale: Tamale) {
    this.name.disable();
    this.name.setValue(tamale.tamaleName);
    this.price.disable();
    this.price.setValue(tamale.tamalePrice);
    this.rating.disable();
    this.rating.setValue("" + tamale.tamaleRating);
    this.filling.disable();
    this.filling.setValue(tamale.tamaleFilling);
    this.description.disable();
    this.description.setValue(tamale.tamaleDescription);
  }

  whatsWrong() {
    if (!this.name.value || this.name.value.trim().length === 0) {
      return "Name cannot be blank";
    }
    if (!this.rating.value ||this.rating.value.trim().length === 0) {
      return "Rating cannot be blank";
    }
    let r = Number(this.rating.value);
    if (isNaN(r)) {
      return "Rating must be a number";
    }
    if (r < 0 || r > 5) {
      return "Rating must be a number between 0 and 5";
    }
    if (!this.price.value || this.price.value.toString().trim().length === 0) {
      return "Price cannot be blank";
    }
    if (!this.filling.value || this.filling.value.toString().trim().length === 0) {
      return "Fillng cannot be blank";
    }
    if (!this.description.value || this.description.value.trim().length === 0) {
      return "Description cannot be blank";
    }

    return "";
  }

  isSubmitDisabled() {
    return this.whatsWrong() != "";
  }

  handleCancelButton() {
    this.store.dispatch(UIActions.cancelTamaleAction());
  }

  handleSubmitButton() {
    switch (this.mode) {
      case "AddTamale": {
        const newTamale: Tamale = {
          tamaleId:          this.tamaleId,
          restaurantId:      this.restaurantId,
          tamaleName:        this.name?.value!.trim(),
          tamaleRating:      Number(this.rating.value),
          tamaleRatings:     [],
          tamalePrice:       this.price.value!.toString().trim(),
          tamaleFilling:     this.filling.value!.trim(),
          tamaleDescription: this.description.value!.trim(),
          tamaleComments:    [],
          nComments:         0,
          tamaleImages:      [],
          nImages:           0
        }
        let uId: number = 0;
        this.userId$.subscribe(x => uId = x);
        this.store.dispatch(DataActions.addTamale({
          data:   newTamale,
          userId: uId
        }));
        break;
      }
      case "EditTamale": {
        const tamaleCopy: Tamale = JSON.parse(JSON.stringify(this.tamale));
        tamaleCopy.tamalePrice = this.price.value!.toString().trim(),
        this.store.dispatch(DataActions.updateTamale({ data: tamaleCopy}));
        break;
      }
      case "DeleteTamale": {
        this.store.dispatch(DataActions.deleteTamale({ data: this.tamale!}));
        break;
      }
    }
  }
}
