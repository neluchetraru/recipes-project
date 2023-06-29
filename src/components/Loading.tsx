import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="100%"
      alignItems="center"
    >
      <Typography variant="h3" color="primary" mb={3}>
        Working on it...
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
