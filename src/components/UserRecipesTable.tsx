import { Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useUserQueryStore from "../store";

const UserRecipesTable = () => {
  const userRecipes = useUserQueryStore((s) => s.userQuery.userRecipes);
  const deleteUserRecipe = useUserQueryStore((s) => s.deleteUserRecipe);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, color: "black" }}>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Ingredients</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRecipes.map((recipe) => (
            <TableRow key={recipe.title}>
              <TableCell width="100px">
                <Box component="img" src={recipe.image} width="100px" />
              </TableCell>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>{recipe.method}</TableCell>
              <TableCell>{recipe.ingredients.join(",")}</TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => deleteUserRecipe(recipe.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserRecipesTable;
