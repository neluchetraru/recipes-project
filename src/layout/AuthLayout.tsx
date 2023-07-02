import { Box, Card, CardActions, CardHeader, Link } from "@mui/material";
import React, { useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const AuthLayout = () => {
  const [page, setPage] = useState<"signup" | "signin">("signin");

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
