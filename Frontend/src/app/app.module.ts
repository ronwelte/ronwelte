import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { HttpClientModule }        from '@angular/common/http';
import { ReactiveFormsModule }     from '@angular/forms';

import { AppComponent }            from './app.component';
import { StoreModule }             from '@ngrx/store';
import { EffectsModule }           from '@ngrx/effects';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantComponent }     from './components/restaurant/restaurant.component';
import { LocationComponent }       from './components/location/location.component';
import { CommentComponent }        from './components/comment/comment.component';
import { ImageComponent }          from './components/image/image.component';
import { TamaleComponent }         from './components/tamale/tamale.component';
import { showHideReducer }         from './reducers';
import { RestaurantListEffects }   from './effects';
import { TamaleEditorComponent }   from './components/tamale-editor/tamale-editor.component';
import { RatingEditorComponent }   from './components/rating-editor/rating-editor.component';
import { LoginComponent } from './components/login/login.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { IntroductionComponent } from './components/introduction/introduction.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantComponent,
    LocationComponent,
    CommentComponent,
    ImageComponent,
    TamaleComponent,
    TamaleEditorComponent,
    RatingEditorComponent,
    LoginComponent,
    UserHeaderComponent,
    IntroductionComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({uiData: showHideReducer}),
    EffectsModule.forRoot([ RestaurantListEffects ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
