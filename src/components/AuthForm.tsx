import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, useFormik } from "formik";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email required!"),
  password: Yup.string()
    .min(6, "Too short!")
    .max(50, "Too long!")
    .required("Password requried!"),
});

interface Props {
  newMember: boolean;
  onNewMember: () => void;
}

const AuthForm = ({ newMember, onNewMember }: Props) => {
  const { createUser, signIn } = UserAuth();

  let header = "",
    handleSubmit: (values: {
      email: string;
      password: string;
    }) => Promise<void>,
    buttonTitle = "",
    linkTitle = "";

  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError("Something went wrong while trying to sign up!");
    }
  };

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError("Invalid credentials!");
    }
  };

  if (newMember) {
    header = "Create a new account";
    buttonTitle = "Sign Up";
    linkTitle = "Already have an account? Sign in here.";
    handleSubmit = handleSignup;
  } else {
    header = "Sign in";
    buttonTitle = "Sign in";
    linkTitle = "Don't have an account? Sign up here.";
    handleSubmit = handleSignIn;
  }

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  return (
    <Card elevation={5} sx={{ maxWidth: "500px", borderRadius: 2 }}>
      <CardHeader title={header} sx={{ textAlign: "center", margin: 2 }} />

      <CardContent
        sx={{ mx: 5 }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        <TextField
          variant="filled"
          label="Email"
          name="email"
          color="info"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          variant="filled"
          color="info"
          fullWidth
          sx={{ mt: 2 }}
          name="password"
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          {buttonTitle}
        </Button>
      </CardContent>
      <CardActions>
        <Link
          color="secondary"
          onClick={() => {
            onNewMember();
            formik.resetForm();
            setError("");
          }}
          sx={{ cursor: "pointer", mb: 2, mx: "auto" }}
        >
          {linkTitle}
        </Link>
      </CardActions>
    </Card>
  );
};

export default AuthForm;
