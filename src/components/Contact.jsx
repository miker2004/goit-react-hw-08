import { Button, Box, Typography } from "@mui/material";

const Contact = ({ contact, deleteContact, onEditContact }) => {
  return (
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
          onClick={deleteContact}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
