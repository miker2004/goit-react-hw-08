import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { useState } from "react";

const EditContactForm = ({ open, contact, onClose, onConfirm }) => {
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({
      ...updatedContact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating contact with data:", updatedContact); 
    onConfirm(updatedContact); 
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
          fullWidth
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            value={updatedContact.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="number"
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={updatedContact.number}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};


export default EditContactForm;
