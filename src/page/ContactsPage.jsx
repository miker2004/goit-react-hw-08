import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/operations"; 
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBox from "../components/SearchBox";
import { CircularProgress, Alert } from "@mui/material";


const ContactsPage = ({ handleAddContact, handleDeleteContact }) => {
  const dispatch = useDispatch();
  const { isLoading, error, items: contacts } = useSelector((state) => state.contacts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Sprawdź, czy użytkownik jest uwierzytelniony

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated]); 

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContact={handleAddContact} />
        <SearchBox />
        <ContactList contacts={contacts} deleteContact={handleDeleteContact} />
      </>
  );
};

export default ContactsPage;
