import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import RecipesGrid from "./components/RecipesGrid";
import SearchBar from "./components/SearchBar";
import NewRecipeForm from "./components/NewRecipeForm";

const App = () => {
  return (
    <div>
      <NavBar />
      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <SearchBar />
        <RecipesGrid />
      </Box> */}
      <NewRecipeForm />
    </div>
  );
};

export default App;
