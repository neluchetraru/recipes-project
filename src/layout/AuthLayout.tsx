import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Link,
} from "@mui/material";
import { useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { Google } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const [page, setPage] = useState<"signup" | "signin">("signin");
  const [loading, setLoading] = useState(false);
  const { signInGoogle } = UserAuth();
  const navigate = useNavigate();
  const handleContinueGoogle = async () => {
    try {
      setLoading(true);
      await signInGoogle();
      navigate("/");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const pageHeader = page === "signin" ? "Sign In" : "Create a new account";
  const linkTitle =
    page === "signup"
      ? "Already have an account? Sign in here."
      : "Don't have an account? Sign up here.";
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      pb={20}
      bgcolor="background.default"
    >
      <Card elevation={5} sx={{ maxWidth: "500px", borderRadius: 2 }}>
        <CardHeader
          title={pageHeader}
          sx={{ textAlign: "center", margin: 2 }}
        />
        {page === "signin" ? <Signin /> : <Signup />}
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleContinueGoogle}
            disabled={loading}
          >
            <Google sx={{ mr: 1 }} color="action" />
            {!loading ? "Continue with Google" : "Loading..."}
          </Button>
        </Box>
        <CardActions>
          <Link
            color="secondary"
            sx={{ cursor: "pointer", mb: 2, mx: "auto" }}
            onClick={() => setPage(page === "signin" ? "signup" : "signin")}
          >
            {linkTitle}
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AuthLayout;
