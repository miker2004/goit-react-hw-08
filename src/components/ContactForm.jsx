import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { TextField, Button, Box, Typography } from '@mui/material';
import toast from "react-hot-toast";

const ContactForm = ({ addContact }) => {
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    console.log('New Contact:', newContact);
    addContact(newContact);
    toast.success("Contact add successfully!");
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, handleBlur, values }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div>
              <Typography variant="body1">Name</Typography>
              <Field
                as={TextField}
                fullWidth
                id="name"
                name="name"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </div>
            <div>
              <Typography variant="body1">Number</Typography>
              <Field
                as={TextField}
                fullWidth
                id="number"
                name="number"
                placeholder="Enter phone number"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.number && Boolean(errors.number)}
                helperText={touched.number && errors.number}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;