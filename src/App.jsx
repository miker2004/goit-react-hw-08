import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchContacts,
  addContact,
  deleteContact,
  logInUser,
  logOutUser,
  signupUser,
} from './redux/operations';
import './App.css';
import SignIn from "./components/SignIn";
import { CssBaseline, CircularProgress, Typography } from "@mui/material";
import LogIn from "./components/LogIn";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import ContactsPage from "./page/ContactsPage";
import HomePage from "./page/HomePage"; 
import store from "./redux/store"
import { Toaster } from "react-hot-toast";
import EditContactForm from "./components/EditContactForm";
import { clearAuthState } from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: contacts, isLoading, error } = useSelector((state) => state.contacts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts());
    }
  }, [dispatch, user]);

  const handleLogOut = () => {
    dispatch(logOutUser())
      .then(() => {
        console.log('Logged out. Current state:', store.getState().auth);
        dispatch(clearAuthState()); 
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleSignUp = (userData) => {
    dispatch(signupUser(userData));
  };

  const handleLogIn = (userData) => {
    dispatch(logInUser(userData)).then(() => {
      navigate('/contacts');
    });
  };

  const handleAddContact = (contact) => {
    dispatch(addContact(contact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <CssBaseline />
      <Navigation 
        isAuthenticated={!!user} 
        userName={user?.name} 
        onLogout={handleLogOut} 
      />
      {isLoading && <CircularProgress />} 
      {error && <Typography color="error">{error}</Typography>} 
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/contacts"
          element={<ContactsPage 
            handleAddContact={handleAddContact} 
            handleDeleteContact={handleDeleteContact} 
            contacts={contacts} />}
        />

        <Route path="/register" element={<SignIn 
        handleSignUp={handleSignUp} />} />

        <Route path="/login" element={<LogIn 
        handleLogIn={handleLogIn} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 7000, 
        }}
      />
    </div>
  );
};

export default App;
