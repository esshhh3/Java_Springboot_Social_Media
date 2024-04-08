
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/Auth/authActions";
import { useNavigate, redirect } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log("handle submit", values);
      const response = await dispatch(loginUser({ data: values }));

      // Check if login was successful and token was generated
      if (response.payload.token) {
        // Navigate to home page
        return redirect("/home/feed");
      } else {
        // Handle unsuccessful login
        console.log("Login unsuccessful");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        // validationSchema={validationSchema}
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
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-5">
        <p>Don't have an account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
}

export default Login;
