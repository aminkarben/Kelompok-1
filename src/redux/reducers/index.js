import { combineReducers } from "redux";
import popularMovieReducer from "./popularMovieReducer";
import searchReducers from "./searchReducers";

export default combineReducers({
    popular: popularMovieReducer,
    search: searchReducers,
});
