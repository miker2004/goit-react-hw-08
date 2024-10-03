import { Button, Box, Typography } from "@mui/material";

const Contact = ({ contact, deleteContact }) => {
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteContact(contact.id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default Contact;
