import { createAction, props }  from '@ngrx/store';
import { LoginData }            from './interfaces';
import { Restaurant }           from './interfaces';
import { Tamale }               from './interfaces';
import { RestaurantRatingData } from './interfaces';
import { TamaleRatingData }     from './interfaces';
import { Comment }              from "./interfaces";

export const loadRestaurantList        = createAction('[Data] Load Restaurant List');
export const loadRestaurantListSuccess = createAction(
  '[Data] Load Restaurant List Success',
   props<{ data: Restaurant[]}>()
);
export const loadRestaurantListError   = createAction('[Data] Load Restaurant List Error');

export const addTamale                 = createAction(
  '[Data] Add Tamale',
  props<{ data: Tamale, userId: number}>());
export const addTamaleSuccess          = createAction('[Data] Add Tamale Success');
export const addTamaleError            = createAction('[Data] Add Tamale Error');

export const updateTamale                 = createAction(
  '[Data] Update Tamale',
  props<{ data: Tamale}>());
export const updateTamaleSuccess          = createAction('[Data] Update Tamale Success');
export const updateTamaleError            = createAction('[Data] Update Tamale Error');

export const updateRestaurantSuccess      = createAction('[Data] Update Restaurant Success');

export const deleteTamale                 = createAction(
  '[Data] Delete Tamale',
  props<{ data: Tamale}>());
export const deleteTamaleSuccess          = createAction('[Data] Delete Tamale Success');

export const addTamaleRating = createAction(
  "[Data] Add Tamale Rating", props< TamaleRatingData >()
);
export const updateTamaleRating = createAction(
  "[Data] Update Tamale Rating", props< TamaleRatingData >()
);

export const addRestaurantRating = createAction(
  "[Data] Add Restaurant Rating", props< RestaurantRatingData >()
);
export const updateRestaurantRating = createAction(
  "[Data] Update Restaurant Rating", props< RestaurantRatingData >()
);

export const addTamaleCommentAction = createAction(
  "[Data] Add Tamale Comment", props<{ data: Comment}>()
);
export const addRestaurantCommentAction = createAction(
  "[Data] Add Restaurant Comment", props<{ data: Comment}>()
);

export const loginAction = createAction(
  "[Data] Login", props< LoginData >()
);
export const loginSuccess = createAction(
  "[Data] Login Success", props< LoginData  >()
);
export const loginFail = createAction("[Data] Login Results");

