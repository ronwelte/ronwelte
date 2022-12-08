export interface LoginData {
  username: string;
  password: string;
  status:   string;
  userId:   number;
}

export interface Location {
  locationAddress: string;
  locationLat:     number;
  locationLon:     number;
  locationPhone:   string;
}

export interface Comment {
  text:     string;
  userId:   number;
  userName: string;
  thingId:  number;   // tamaleId or restaurantId
}

export interface Rating {
  rating:   number;
  userName: string;
  userId:   number;
}

export interface Image {
  url:      string;
  userName: string;
}

export interface Tamale {
  tamaleId:          number;
  restaurantId:      number;
  tamaleName:        string;
  tamaleRating:      number;
  tamaleRatings:     Rating[];
  tamalePrice:       string;  // yes, a string
  tamaleFilling:     string;
  tamaleDescription: string;
  tamaleComments:    Comment[];
  nComments:         number;
  tamaleImages:      Image[];
  nImages:           number;
}

export interface Restaurant {
  restaurantId:          number;
  restaurantName:        string;
  restaurantRating:      number;
  restaurantRatings:     Rating[];
  restaurantWebsite:     string;
  restaurantLocations:   Location[];
  nLocations:            number;
  restaurantComments:    Comment[];
  nComments:             number;
  restaurantImages:      Image[];
  nImages:               number;
  restaurantTamales:     Tamale[];
  nTamales:              number;
}

export interface UiDataState {
  userId:            number;
  userName:          string;
  loginFailed:       boolean;
  isSpinning:        boolean;
  listShowing:       string;
  restaurants:       Restaurant[];
  nRestaurants:     number;
  formState:         string;
  formRestaurantId?: number;
  tamale?:           Tamale;
}

export interface AppState {
  uiData: UiDataState;
}

export interface TamaleRatingData {
  tamaleId: number;
  userId:   number;
  rating:   number;
}


export interface RestaurantRatingData {
  restaurantId: number;
  userId:       number;
  rating:       number;
}


