import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import NewRecipeForm from "../components/NewRecipeForm";
import UserRecipesTable from "../components/UserRecipesTable";
import { Add } from "@mui/icons-material";
import useUserQueryStore from "../store";

const UserRecipes = () => {
  const userRecipes = useUserQueryStore((s) => s.userQuery.userRecipes);
  const [displayForm, setDisplayForm] = useState(false);

  if (displayForm)
    return (
      <Box flex={1} bgcolor="background.default">
        <NewRecipeForm handleCancelClick={() => setDisplayForm(false)} />
      </Box>
    );
  if (userRecipes.length === 0)
    return (
      <Box flex={1} bgcolor="background.default" pt={3}>
        <Box mx="50px" pt={2} display="flex" alignItems="center">
          <Typography color="text.primary">
            You don't have any recipes created yet. Start by pressing on the add
            button...
          </Typography>
          <Button
            variant="contained"
            color="secondary"
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
    <Box px={4} flex={1} pt={3} bgcolor="background.default">
      <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={() => setDisplayForm(true)}
        startIcon={<Add />}
        color="secondary"
      >
        Add recipe
      </Button>
      <Typography variant="h4" mt={4} mb={2}>
        My recipes:
      </Typography>
      <UserRecipesTable />
    </Box>
  );
};

export default UserRecipes;
