import { Button, Box, Typography } from "@mui/material";
import ConfirmationModal from './ConfirmationModal';
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = ({ contact, deleteContact, onEditContact }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id);
      toast.success("Contact deleted successfully!", {
        duration: 7000,
      });
    } catch (error) {
      toast.error("Failed to delete the contact.", {
        duration: 7000, 
      });
    } finally {
      setOpen(false); 
    }
  };
  

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid lightgray',
          borderRadius: '8px',
          padding: '8px 16px',
          marginBottom: '8px',
        }}
      >
        <Box>
          <Typography variant="body1">{contact.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {contact.number}
          </Typography>
        </Box>
        <Box sx={{display: "flex", gap: 2}}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEditContact(contact)} 
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)} 
          >
            Delete
          </Button>
        </Box>
      </Box>

      <ConfirmationModal 
        open={open} 
        onClose={() => setOpen(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
};

export default Contact;
