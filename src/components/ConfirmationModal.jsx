import { Button } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';

const ContactList = ({ contacts, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleDeleteClick = (contactId) => {
    setSelectedContactId(contactId);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(selectedContactId); 
      console.log("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setModalOpen(false);
      setSelectedContactId(null); 
    }
  };

  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.id}>
          <span>{contact.name}</span>
          <Button variant="contained" color="error" onClick={() => handleDeleteClick(contact.id)}>
            Delete
          </Button>
        </div>
      ))}
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)} 
        onConfirm={handleDeleteConfirm} 
      />
    </div>
  );
};

export default ContactList;
