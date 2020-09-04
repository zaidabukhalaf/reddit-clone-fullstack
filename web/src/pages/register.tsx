import React from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";

interface Props {}

const Register = (props: Props) => {
  return (
    <Box m="auto" mt={40} w={400}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              label="Username"
              name="username"
              placeholder="username"
            />
            <Box mt={4}>
              <InputField
                label="Password"
                name="password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
