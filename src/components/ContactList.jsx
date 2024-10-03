import { Box, Typography } from "@mui/material";
import Contact from "./Contact";

const ContactList = ({ contacts, deleteContact }) => {
  const filter = useSelector((state) => state.filters.name);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      ) : (
        <Typography variant="body1">No contacts available.</Typography>
      )}
    </Box>
  );
};

export default ContactList;
