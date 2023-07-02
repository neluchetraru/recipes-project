import { Box, Grid, Typography } from "@mui/material";
import useRecipesBulk from "../hooks/useRecipesBulk";
import RecipeCard from "../components/RecipeCard";
import useUserQueryStore from "../store";
import Loading from "../components/Loading";

const Favorites = () => {
  const userFavorites = useUserQueryStore((s) => s.userQuery.userFavorites);
  const { data, isLoading, isError } = useRecipesBulk(userFavorites);
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Box mx={5} mt={2}>
        <Typography color="error" variant="h4">
          Something went wrong while processing your request. Check your
          connection and try again later.
        </Typography>
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
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favorites;
