import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const UserSignInSchema = Yup.object().shape({
  email: Yup.string().required("Email is a required field!"),
  password: Yup.string().required("Password is a requried field!"),
});

const Signin = () => {
  const { signIn } = UserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await signIn(email, password);
      navigate("/");
      setLoading(false);
    } catch (e) {
      setError("Invalid credentials!");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserSignInSchema,
    onSubmit: async (values) => {
      await handleSignIn(values);
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
      <Box display="flex" justifyContent="center">
        {!loading ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign In
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
      </Box>
    </CardContent>
  );
};

export default Signin;
