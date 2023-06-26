import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SearchBar = () => {
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid xs={10} sm={8} md={6}>
        <TextField
          placeholder="Search for a recipe..."
          sx={{ mb: "50px", width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
