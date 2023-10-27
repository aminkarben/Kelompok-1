import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import searchReducers from "./reducers/searchReducers";

export default configureStore({
    reducer: rootReducers,
    search: searchReducers,
    devTools: import.meta.env.MODE === "development",
});
