import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipesGrid from "../components/RecipesGrid";
import { Box, Container, Divider, useTheme } from "@mui/material";
import SearchBar from "../components/SearchBar";
import useRecipe from "../hooks/useRecipe";
import useRecipes from "../hooks/useRecipes";

const Home = () => {
  const { palette } = useTheme();
  const [searchBarValue, setSearchBarValue] = useState("");
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useRecipes(searchBarValue);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
      bgcolor={palette.background.default}
    >
      <Divider />
      <Box pt={5}>
        <SearchBar onSearch={(value) => setSearchBarValue(value)} />
        <RecipesGrid
          data={data}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </Box>
    </Box>
  );
};

export default Home;
