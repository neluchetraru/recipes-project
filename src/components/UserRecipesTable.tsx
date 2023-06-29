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
import React from "react";

interface Props {
  recipes: any[];
  setUserRecipes: any;
}

// interface UserRecipes {
//   id: string;
//   image: string;
//   title: string;
//   method: string;
//   ingredients: string[];
// }
const UserRecipesTable = ({ recipes, setUserRecipes }: Props) => {
  const handleDelete = (title: string) => {
    let currentRecipes = JSON.parse(
      localStorage.getItem("userRecipes") || "[]"
    );
    currentRecipes = currentRecipes.filter(
      (recipe: any) => recipe.title !== title
    );
    console.log(currentRecipes);
    setUserRecipes(currentRecipes);
    localStorage.setItem("userRecipes", JSON.stringify(currentRecipes));
  };

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
          {recipes.map((recipe) => (
            <TableRow key={recipe.title}>
              <TableCell width="100px">
                <Box
                  component="img"
                  src={`data:image/jpeg;base64,${recipe.image}`}
                  width="100px"
                />
              </TableCell>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>{recipe.method}</TableCell>
              <TableCell>{recipe.ingredients.join(",")}</TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(recipe.title)}
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
