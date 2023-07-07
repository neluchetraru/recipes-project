import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

const UserSignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email required!"),
  password: Yup.string()
    .min(6, "Too short!")
    .max(50, "Too long!")
    .required("Password requried!"),
});

const Signup = () => {
  const { createUser } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await createUser(email, password);
      navigate("/");
      setLoading(false);
    } catch (e) {
      if (e instanceof FirebaseError && e.code == AuthErrorCodes.EMAIL_EXISTS)
        setError("This user already exists.");
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserSignUpSchema,
    onSubmit: async (values) => {
      await handleSignUp(values);
    },
  });
  return (
    <CardContent sx={{ mx: 5 }} component="form" onSubmit={formik.handleSubmit}>
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
      {!loading ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled
          startIcon={<CircularProgress size={20} color="secondary" />}
          sx={{ mt: 2 }}
        >
          Loading...
        </Button>
      )}
    </CardContent>
  );
};

export default Signup;
