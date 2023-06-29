import React, { useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SearchBar = ({ onSearch }: { onSearch: (e: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid xs={10} sm={8} md={6}>
        <TextField
          placeholder="Search for a recipe..."
          sx={{ mb: "50px", width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    onSearch(inputRef?.current?.value || "");
                  }}
                >
                  <SearchIcon color="info" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputRef={inputRef}
          variant="filled"
          color="info"
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
