import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, updateContact } from "../redux/operations"; 
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBox from "../components/SearchBox";
import { CircularProgress, Alert } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import EditContactForm from "../components/EditContactForm";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, items: contacts } = useSelector((state) => state.contacts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated]); 

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      await dispatch(updateContact(updatedContact));
      toast.success("Contact updated successfully!", { duration: 7000 });
    } catch (error) {
      toast.error("Failed to update contact.", { duration: 7000 });
    } finally {
      setEditModalOpen(false); 
    }
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList 
        contacts={contacts} 
        onEditContact={handleEditContact} 
      />
      {selectedContact && (
        <EditContactForm 
          open={isEditModalOpen} 
          onClose={() => setEditModalOpen(false)} 
          onConfirm={handleUpdateContact} 
          contact={selectedContact} 
        />
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default ContactsPage;
