import { Box } from "@mui/material";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [newMember, setNewMember] = useState(false);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <AuthForm
        newMember={newMember}
        onNewMember={() => setNewMember(!newMember)}
      />
    </Box>
  );
};

export default Auth;
