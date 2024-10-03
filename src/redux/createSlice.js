import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const initialState = {
  items: [], 
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.error = null; 
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.error = null; 

        state.items.push(action.payload);  
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;  
        state.error = action.payload;  
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;  
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.error = null;  
        state.items = state.items.filter(  
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;  
        state.error = action.payload;  
      });
  },
});

export default contactsSlice.reducer;
