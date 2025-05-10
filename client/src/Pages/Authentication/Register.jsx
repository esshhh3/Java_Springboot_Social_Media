import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../state/Auth/authActions";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../config/api";

// initial values/field required for authentication 
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState("");

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    setSubmitError("");
    try {
      const apiPayload = {
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        password: values.password,
        gender: values.gender,
      };
      const response = await dispatch(registerUser({ data: apiPayload }));

      // Try all possible locations for the token
      const token =
        response?.payload?.token ||
        response?.payload?.data?.token ||
        response?.token;

      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token); // set token for axios
        navigate("/home/feed");
      } else {
        setSubmitError(
          response.payload?.message || "Registration failed. Please try again."
        );
        setErrors({
          submit:
            response.payload?.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setSubmitError(error.message || "Registration failed. Please try again.");
      setErrors({
        submit: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }
  
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ isSubmitting, errors, values }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              <div>
                <Field
                  as={TextField}
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />

                <ErrorMessage
                  name="firstName"
                  component={"div"}
                  className="text-red-500"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />

                <ErrorMessage
                  name="lastName"
                  component={"div"}
                  className="text-red-500"
                />
              </div>

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

              <div>
                <Field name="gender">
                  {({ field }) => (
                    <RadioGroup
                      row
                      aria-label="gender"
                      {...field}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel 
                        value="male" 
                        control={<Radio />} 
                        label="Male" 
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                </Field>
                <ErrorMessage
                  name="gender"
                  component={"div"}
                  className="text-red-500"
                />
              </div>

              {errors.submit && (
                <div className="text-red-500">{errors.submit}</div>
              )}
            </div>
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || !values.firstName || !values.lastName || !values.email || !values.password || !values.gender}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            {submitError && <div className="text-red-500">{submitError}</div>}
          </Form>
        )}
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-5">
        <p>Already have an account?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
}

export default Register;