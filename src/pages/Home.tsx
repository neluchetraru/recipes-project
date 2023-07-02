import { useState } from "react";
import RecipesGrid from "../components/RecipesGrid";
import { Box, Divider } from "@mui/material";
import SearchBar from "../components/SearchBar";
import useRecipes from "../hooks/useRecipes";

const Home = () => {
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
      bgcolor="background.default"
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
