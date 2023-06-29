import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Box, Button, Typography } from "@mui/material";
import NewRecipeForm from "../components/NewRecipeForm";
import UserRecipesTable from "../components/UserRecipesTable";
import { Add } from "@mui/icons-material";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  useEffect(() => {
    setUserRecipes(JSON.parse(localStorage.getItem("userRecipes") || "[]"));
  }, [displayForm]);

  if (displayForm)
    return (
      <Box flex={1} bgcolor="background.default">
        <NewRecipeForm handleCancel={() => setDisplayForm(false)} />
      </Box>
    );
  if (userRecipes.length === 0)
    return (
      <Box flex={1}>
        <Box mx="50px" mt={2} display="flex" alignItems="center">
          <Typography color="black">
            You don't have any recipes created yet. Start by pressing on the add
            button...
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => setDisplayForm(true)}
            startIcon={<Add />}
          >
            Add recipe
          </Button>
        </Box>
      </Box>
    );
  return (
    <Box mx={4} flex={1}>
      <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={() => setDisplayForm(true)}
        startIcon={<Add />}
      >
        Add recipe
      </Button>
      <Typography>My recipes:</Typography>
      <UserRecipesTable recipes={userRecipes} setUserRecipes={setUserRecipes} />
    </Box>
  );
};

export default UserRecipes;
