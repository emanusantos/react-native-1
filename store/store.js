import { configureStore } from "@reduxjs/toolkit";
import { searchesReducer } from "./searchSlice";

const store = configureStore({
    reducer: {
        search: searchesReducer
    }
});

export default store;