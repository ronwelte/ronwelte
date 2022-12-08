import { createAction, props }  from "@ngrx/store";
import { Restaurant }           from "./interfaces";
import { Tamale }               from "./interfaces";

export const incAction = createAction("[UI] Increment");

export const showListAction = createAction(
  "[UI] Show List", props<{listName: string;}>()
);
export const hideListAction = createAction("[UI] Hide List");

export const addTamaleAction = createAction(
  "[UI] Add Tamale", props<{ restaurantId: number}>()
);
export const editTamaleAction = createAction(
  "[UI] Edit Tamale", props<{ tamale: Tamale}>()
);
export const cancelTamaleAction = createAction(
  "[UI] Cancel Tamale"
);
export const deleteTamaleAction = createAction(
  "[UI] Delete Tamale", props<{ tamale: Tamale}>()
);

export const logoutAction         = createAction("[UI] Logout Action");
export const loginFailAcknowledge = createAction("[UI] Login Fail Acknowledge");

