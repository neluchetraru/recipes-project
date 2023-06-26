import React, { useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";

const NewRecipeForm = () => {
  const [ingredients, setIngredients] = useState(["olives", "water"]);
  const [newIngredient, setNewIngredient] = useState("");
  const [imagePath, setImagePath] = useState("");

  return (
    <Box mx={5} mt={4} sx={{ color: "black" }}>
      <Typography variant="h5" textAlign="center">
        Add a new recipe
      </Typography>
      <FormControl sx={{ mt: 4 }} fullWidth>
        <Grid container display="flex" justifyContent="center">
          <Grid md={6} xs={10}>
            <TextField label="Title" sx={{ mt: 2 }} fullWidth />
            <TextField
              label="Method of preparation"
              sx={{ mt: 2 }}
              fullWidth
              multiline
              rows={4}
            />
            <Box mt={2} mb={1} display="flex" alignItems="center">
              <ListIcon />
              <Typography ml={1}>List of ingredients</Typography>
            </Box>
            <Box>
              {ingredients.map((ingredient) => (
                <ListItem>{ingredient}</ListItem>
              ))}
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setIngredients([...ingredients, newIngredient]);
                          setNewIngredient("");
                        }}
                        disabled={newIngredient === ""}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                placeholder="New ingredient"
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Button variant="outlined" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImagePath(e.target.value)}
                />
              </Button>
              <Typography ml={1}>
                {imagePath === "" ? "No file selected" : imagePath}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button color="primary" variant="contained">
                Save
              </Button>
              <Button color="secondary" variant="contained" sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default NewRecipeForm;
