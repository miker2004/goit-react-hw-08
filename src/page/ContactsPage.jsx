import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, updateContact } from "../redux/operations"; 
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBox from "../components/SearchBox";
import toast, { Toaster } from "react-hot-toast";
import EditContactForm from "../components/EditContactForm";

const ContactsPage = ({ handleDeleteContact, handleAddContact }) => {
  const dispatch = useDispatch();
  const { isLoading, error, items: contacts = [] } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name); 
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
      await dispatch(updateContact({
        id: selectedContact.id,
        name: updatedContact.name,
        number: updatedContact.number
      }));
      toast.success("Contact updated successfully!", { duration: 7000 });
    } catch (error) {
      toast.error("Failed to update contact.", { duration: 7000 });
    } finally {
      setEditModalOpen(false); 
    }
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.number.includes(filter) 
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <SearchBox />
      <ContactList 
        onDelete={handleDeleteContact}
        contacts={filteredContacts} 
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
