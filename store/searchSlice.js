import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searches: []
    },
    reducers: {
        addSearch: (state, action) => {
            state.searches.unshift(action.payload);
        },
    }
});

export const { addSearch } = searchSlice.actions;
export const searchesReducer = searchSlice.reducer;