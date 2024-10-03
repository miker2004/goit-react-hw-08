import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/filter";
import { TextField, Box, Typography } from "@mui/material";

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Find contacts by name</Typography>
      <Formik initialValues={{ searchTerm: '' }}>
        {({ values, handleChange }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              variant="outlined"
              placeholder="Search contacts"
              name="searchTerm"
              value={values.searchTerm}
              onChange={(event) => {
                handleChange(event);
                dispatch(setFilter(event.target.value));
              }}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBox;
