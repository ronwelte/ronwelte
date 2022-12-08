import { Injectable }                    from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of }                     from "rxjs";
import { map, mergeMap, catchError }     from "rxjs/operators";
import { tap }                           from "rxjs/operators";
import { DataService }                   from "./data.service";
import { loadRestaurantList }            from "./data.actions";
import { loadRestaurantListSuccess }     from "./data.actions";
import { loadRestaurantListError }       from "./data.actions";
import { addTamale }                     from "./data.actions";
import { addTamaleSuccess }              from "./data.actions";
import { addTamaleError }                from "./data.actions";
import { updateTamale }                  from "./data.actions";
import { updateTamaleSuccess }           from "./data.actions";
import { deleteTamale }                  from "./data.actions";
import { deleteTamaleSuccess }           from "./data.actions";
import { updateRestaurantRating }        from "./data.actions";
import { addRestaurantRating }           from "./data.actions";
import { updateTamaleRating }            from "./data.actions";
import { addTamaleRating }               from "./data.actions";
import { addTamaleCommentAction }        from "./data.actions";
import { addRestaurantCommentAction }    from "./data.actions";
import { updateRestaurantSuccess }       from "./data.actions";
import { loginAction }                   from "./data.actions";
import { loginSuccess }                  from "./data.actions";
import { loginFail }                     from "./data.actions";

import { Tamale }                        from "./interfaces";

@Injectable()
export class RestaurantListEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      tap(x => { console.log("effects: Login Action"); console.log(x.username); }),
      mergeMap((x) => this.dataService.login(x)),
      map(thing => thing.userId > 0 ? loginSuccess( thing ) : loginFail())
    )
  );

  
  loadRestaurantList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantList,
             loginSuccess),
      mergeMap(() => this.dataService.getRestaurantList()
                       .pipe(tap((x => console.log(x))))),
      map(thing => loadRestaurantListSuccess({ data: thing })),
      catchError(error => of( loadRestaurantListError ))
    )
  );

  addTamale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTamale),
      mergeMap((x) => this.dataService.addTamaleToRestaurant(x.data, x.userId)
                        .pipe(tap(x => console.log(x)))),
      map(() => addTamaleSuccess())
    )
  );

  addTamaleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTamaleSuccess),
      map(() => loadRestaurantList()),
    )
  );

  updateTamale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTamale),
      tap(x => { console.log("effects: Update Tamale Action"); console.log(x.data); }),
      mergeMap((x) => this.dataService.updateTamale(x.data)
                        .pipe(tap(x => console.log(x)))),
      map(() => updateTamaleSuccess())
    )
  );

  addTamaleComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTamaleCommentAction),
      tap(x => { console.log("effects: Add Tamale Comment Action"); console.log(x.data); }),
      mergeMap((x) => this.dataService.addTamaleComment(x.data)
                        .pipe(tap(x => console.log(x)))),
      map(() => updateTamaleSuccess())
    )
  );

  updateTamaleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTamaleSuccess),
      map(() => loadRestaurantList()),
    )
  );

  deleteTamale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTamale),
      tap(x => { console.log("effects: Delete Tamale Action"); console.log(x.data); }),
      mergeMap((x) => this.dataService.deleteTamale(x.data)
                        .pipe(tap(x => console.log(x)))),
      map(() => deleteTamaleSuccess())
    )
  );

  deleteTamaleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTamaleSuccess),
      map(() => loadRestaurantList()),
    )
  );

  updateRestaurantSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRestaurantSuccess),
      map(() => loadRestaurantList()),
    )
  );

  addRestaurantComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRestaurantCommentAction),
      tap(x => { console.log("effects: Add Restaurant Comment Action"); console.log(x.data); }),
      mergeMap((x) => this.dataService.addRestaurantComment(x.data)
                        .pipe(tap(x => console.log(x)))),
      map(() => updateRestaurantSuccess())
    )
  );

  updateRestaurantRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRestaurantRating),
      mergeMap((x) => this.dataService.updateRestaurantRating(x).pipe(
        tap(x => console.log(x)))),
      map(() => updateRestaurantSuccess())
    )
  );

  addRestaurantRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRestaurantRating),
      mergeMap((x) => this.dataService.addRestaurantRating(x).pipe(
        tap(x => console.log(x)))),
      map(() => updateRestaurantSuccess())
    )
  );

  updateTamaleRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTamaleRating),
      mergeMap((x) => this.dataService.updateTamaleRating(x).pipe(
        tap(x => console.log(x)))),
      map(() => loadRestaurantList()),
    )
  );

  addTamaleRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTamaleRating),
      mergeMap((x) => this.dataService.addTamaleRating(x).pipe(
        tap(x => console.log(x)))),
      map(() => loadRestaurantList()),
    )
  );

  constructor(
    private actions$:    Actions,
    private dataService: DataService
  ) {}

}

