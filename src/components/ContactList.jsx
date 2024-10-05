import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import Contact from './Contact';
import toast from 'react-hot-toast';

const ContactList = ({ contacts, onDelete, onEditContact }) => { 
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
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact")
    } finally {
      setModalOpen(false);
      setSelectedContactId(null); 
    }
  };

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <Contact 
            contact={contact} 
            deleteContact={() => handleDeleteClick(contact.id)} 
            onEditContact={onEditContact} 
          />
        </div>
      ))}

      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)} 
        onConfirm={handleDeleteConfirm} 
        message="Are you sure you want to delete this contact?" 
      />
    </div>
  );
};

export default ContactList;
