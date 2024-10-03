import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts, addContact, deleteContact } from './redux/operations';
import './App.css';
import SignIn from "./components/SignIn";
import { CssBaseline } from "@mui/material";
import LogIn from "./components/LogIn";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import ContactsPage from "./page/ContactsPage";
import HomePage from "./page/HomePage"; 

const App = () => {
  const dispatch = useDispatch();

  const { items: contacts, isLoading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    const duplicate = contacts.some(contact =>
      contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <CssBaseline />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contacts"
          element={<ContactsPage handleAddContact={handleAddContact} handleDeleteContact={handleDeleteContact} contacts={contacts} />}
        />
        <Route path="/register" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
