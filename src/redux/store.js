import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./createSlice";
import filtersReducer from "./filter"; 

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

export default store;
