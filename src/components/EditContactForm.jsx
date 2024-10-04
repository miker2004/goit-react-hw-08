import { useState } from 'react';
import EditContactForm from './EditContactForm';
import { toast } from 'react-hot-toast';

const ParentComponent = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const response = await fetch(`/contacts/${updatedContact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer yourAuthToken`, 
        },
        body: JSON.stringify({
          name: updatedContact.name,
          number: updatedContact.number,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      toast.success("Contact updated successfully!", { duration: 7000 });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact.", { duration: 7000 });
    } finally {
      setModalOpen(false);
      setSelectedContact(null); 
    }
  };

  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.id}>
          <span>{contact.name}</span>
          <button onClick={() => handleEditClick(contact)}>Edit</button>
        </div>
      ))}
      {selectedContact && (
        <EditContactForm
          contact={selectedContact}
          onSave={handleUpdateContact} 
          open={modalOpen}
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ParentComponent;
