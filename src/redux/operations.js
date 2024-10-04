import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global"; 


export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth?.token; 

    if (!token) {
      return rejectWithValue("User not authenticated"); 
    }

    try {
      const response = await axios.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "users/signup",
  async (userData, thunkAPI) => {
    try {
      console.log("Rejestracja - wysyłane dane:", userData); 
      const response = await axios.post("/users/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Rejestracja - odpowiedź serwera:", response.data); 
      return response.data;
    } catch (e) {
      console.error("Signup Error Full Response:", e.response); 
      console.log("Signup Error Message:", e.message); 
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);


export const logInUser = createAsyncThunk(
  "users/login",
  async (credentials, thunkAPI) => {
    try {
      console.log("Logowanie - wysyłane dane:", credentials); 
      const response = await axios.post("/users/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Logowanie - odpowiedź serwera:", response.data); 
      return response.data;
    } catch (e) {
      console.error("Login Error Full Response:", e.response); 
      console.log("Login Error Message:", e.message); 
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const logOutUser = createAsyncThunk('auth/logOutUser', async (_, { rejectWithValue }) => {
  try {
    await axios.post('/api/logout'); 
    return true; 
  } catch (error) {
    return rejectWithValue(error.response.data.message);  
  }
});

export const getUserInfo = createAsyncThunk(
  "users/current",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
