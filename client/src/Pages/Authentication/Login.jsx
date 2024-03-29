/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/Auth/authActions";

// initial values/field required for authentication 
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {

  const dispatch = useDispatch();

  function handleSubmit(values) {
    console.log("handle submit", values);
    dispatch(loginUser({ data: values }));
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email here"
                type="email"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password here"
                type="password"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>
          <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color="primary">Login</Button>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
