import { Injectable }              from "@angular/core";
import { HttpClient }              from "@angular/common/http";
import { Observable, of }          from "rxjs";
import { catchError, map, tap }    from "rxjs/operators";

import { LoginData }               from "./interfaces";
import { Restaurant }              from "./interfaces";
import { Tamale }                  from "./interfaces";
import { Comment }                 from "./interfaces";
import { TamaleRatingData }        from "./interfaces";
import { RestaurantRatingData }    from "./interfaces";

@Injectable({
  providedIn: "root"
})
export class DataService {
  baseUrl = "https://ronwelte.com:8000/";
  // baseUrl = "http://localhost:8000/";

  constructor(private http:  HttpClient) { }

  getRestaurantList(): Observable<Restaurant[]>  {
    console.log("Do getRestaurantList( )");
    return this.http.get<Restaurant[]>(this.baseUrl + "data")
      .pipe(
        tap(_ => this.log("fetched main list")),
        catchError(this.handleError<Restaurant[]>("getRestaurantList", []))
      );
  }

  addTamaleToRestaurant(tamale: Tamale, userId: number): Observable<Tamale> {
    console.log("Do addTamaleToRestaurant( )");
    return this.http.post<Tamale>(this.baseUrl + "tamale/" + userId, tamale)
      .pipe(
        catchError(this.handleError<Tamale>("addTamaleToRestaurant", tamale))
      );
  }

  updateTamale(tamale: Tamale): Observable<Tamale> {
    console.log("Do updateTamale( )");
    return this.http.put<Tamale>(this.baseUrl + "tamale", tamale)
      .pipe(
        catchError(this.handleError<Tamale>("updateTamale", tamale))
      );
  }

  addTamaleComment(comment: Comment): Observable<Comment> {
    console.log("Do addTamaleComment( )...");
    return this.http.post<Comment>(this.baseUrl + "tamale_comment", comment)
      .pipe(
        catchError(this.handleError<Comment>("addTamaleComment", comment))
      );
  }

  deleteTamale(tamale: Tamale): Observable<Tamale> {
    console.log("Do deleteTamale( )");
    return this.http.delete<Tamale>(this.baseUrl + "tamale/" + tamale.tamaleId)
      .pipe(
        catchError(this.handleError<Tamale>("deleteTamale", tamale))
      );
  }

  addTamaleRating(ratingData: TamaleRatingData): Observable<TamaleRatingData> {
    console.log("Do addTamaleRating( )...");
    return this.http.post<TamaleRatingData>(this.baseUrl + "tamale_rating", ratingData);
  }

  updateTamaleRating(ratingData: TamaleRatingData): Observable<TamaleRatingData> {
    console.log("Do updateTamaleRating( )...");
    return this.http.put<TamaleRatingData>(this.baseUrl + "tamale_rating", ratingData)
      .pipe(
        catchError(this.handleError<TamaleRatingData>("updateTamaleRating", ratingData))
      );
  }


  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    console.log("Do updateRestaurant( )");
    return this.http.put<Restaurant>(this.baseUrl + "restaurant", restaurant)
      .pipe(
        catchError(this.handleError<Restaurant>("updateRestaurant", restaurant))
      );
  }

  addRestaurantComment(comment: Comment): Observable<Comment> {
    console.log("Do addRestaurantComment( )...");
    return this.http.post<Comment>(this.baseUrl + "restaurant_comment", comment)
      .pipe(
        catchError(this.handleError<Comment>("addRestaurantComment", comment))
      );
  }

  updateRestaurantRating(ratingData: RestaurantRatingData): Observable<RestaurantRatingData> {
    console.log("Do updateRestaurantRating( )...");
    return this.http.put<RestaurantRatingData>(this.baseUrl + "restaurant_rating", ratingData)
      .pipe(
        catchError(this.handleError<RestaurantRatingData>("updateRestaurantRating", ratingData))
      );
  }

  addRestaurantRating(ratingData: RestaurantRatingData): Observable<RestaurantRatingData> {
    console.log("Do addRestaurantRating( )...");
    return this.http.post<RestaurantRatingData>(this.baseUrl + "restaurant_rating", ratingData)
      .pipe(
        catchError(this.handleError<RestaurantRatingData>("addRestaurantRating", ratingData))
      );
  }

  login(data: LoginData): Observable<LoginData> {
    console.log("Do login( )...");
    return this.http.post<LoginData>(this.baseUrl + "login", data)
      .pipe(
        catchError(this.handleError<LoginData>("login", data))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`DataService: ${message}`);
    //this.messageService.add(`DataService: ${message}`);
  }
}
