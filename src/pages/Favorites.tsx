import React from "react";
import RecipesGrid from "../components/RecipesGrid";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import useRecipesBulk from "../hooks/useRecipesBulk";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("userFavorites") || "[]");
  const { data, isLoading } = useRecipesBulk(favorites);
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  if (data?.length === 0 || data === undefined) {
    return (
      <Box>
        <Typography variant="h4" color="primary" ml={5} mt={6}>
          You don't have any saved recipes yet!
        </Typography>
      </Box>
    );
  }
  return (
    <Box flex={1}>
      <Grid container spacing={2} sx={{ mx: "50px" }}>
        {data?.map((recipe) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
              key={recipe.id}
              display="flex"
            >
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favorites;
