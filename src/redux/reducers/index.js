import { combineReducers } from "redux";
import popularMovieReducer from "./popularMovieReducer";
import searchReducers from "./searchReducers";
import authReducer from "./authReducer";
import detailReducers from "./detailReducers";
import profileReducers from "./profileReducers";

export default combineReducers({
    auth: authReducer,
    popular: popularMovieReducer,
    search: searchReducers,
    detail: detailReducers,
    profile: profileReducers,
});
