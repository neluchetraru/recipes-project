import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../theme";
import { useContext } from "react";

const ColorModeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  console.log(theme.palette.mode);
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ColorModeToggle;
