import { Action, createReducer, on } from "@ngrx/store";
import { UiDataState }               from "./interfaces";
import * as UIActions                from "./ui.actions";
import * as DataActions              from "./data.actions";

const RONW_FIX_THIS: number = 10000;

export const initialState: UiDataState = {
  userId:          0,
  userName:        "",
  loginFailed:     false,
  isSpinning:      false,
  listShowing:     "None",
  restaurants:     [],
  nRestaurants:    0,
  formState:       "Hidden",  // AddTamale, EditTamale, DeleteTamale, or Hidden.
}

export const showHideReducer = createReducer(
  initialState,
  on(UIActions.showListAction, (state, {listName}) => {
    return ({ ...state, listShowing: listName});
  }),
  on(UIActions.hideListAction, state => {
    return ({ ...state, listShowing: "None"});
  }),
  on(UIActions.addTamaleAction, (state, {restaurantId}) => {
    return ({ ...state, formState: "AddTamale", formRestaurantId: restaurantId});
  }),
  on(UIActions.cancelTamaleAction, state => {
    return ({ ...state, formState: "Hidden"});
  }),
  on(UIActions.editTamaleAction, (state, {tamale}) => {
    return ({ ...state, formState: "EditTamale", tamale: tamale });
  }),
  on(UIActions.deleteTamaleAction, (state, {tamale}) => {
    return ({ ...state, formState: "DeleteTamale", tamale: tamale });
  }),

  // Load actions
  //
  on(DataActions.addTamaleSuccess, state => {
    return ({ ...state, formState: "Hidden"});
  }),
  on(DataActions.updateTamaleSuccess, state => {
    return ({ ...state, formState: "Hidden"});
  }),
  on(DataActions.deleteTamaleSuccess, state => {
    return ({ ...state, formState: "Hidden"});
  }),
  on(DataActions.loadRestaurantListSuccess, (state, {data}) => {
    console.log(state);
    return ({ ...state, restaurants: data});
  }),
  on(DataActions.loginSuccess, (state, data) => {
    console.log("RONW: login success");
    return ({ ...state,
              userId:      data.userId,
              userName:    data.username,
              isSpinning:  false,
              loginFailed: false});
  }),
  on(DataActions.loginAction, (state) => {
    return ({ ...state, isSpinning: true});
  }),
  on(DataActions.loginFail, (state) => {
    console.log("RONW: login fail");
    return ({ ...state, userId: 0, loginFailed: true, isSpinning: false});
  }),
  on(UIActions.loginFailAcknowledge, (state) => {
    console.log("RONW: login fail ACK");
    return ({ ...state, userId: 0, loginFailed: false});
  }),
  on(UIActions.logoutAction, (state) => {
    console.log("RONW logout");
    return ({ ...state, userId: 0, userName: ""});
  }),
);
