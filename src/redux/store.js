import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./createSlice";
import filtersReducer from "./filter";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,  
  },
});

export default store;
