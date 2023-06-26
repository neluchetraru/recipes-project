import { useState } from "react";
import RecipeCard from "./RecipeCard";
import Grid from "@mui/material/Unstable_Grid2";
import initialRecipes from "../recipes";

interface RecipeResponse {
  image: string;
  id: number;
  title: string;
}

interface Recipes {
  results: RecipeResponse[];
}

const RecipesGrid = () => {
  const [recipes, setRecipes] = useState<Recipes>(initialRecipes);

  return (
    <Grid container spacing={2} sx={{ mx: "50px" }}>
      {recipes?.results?.map((recipe) => (
        <Grid xs={12} sm={6} md={3} lg={2} key={recipe.id}>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipesGrid;
