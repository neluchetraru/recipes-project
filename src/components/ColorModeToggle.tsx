import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../theme";
import { CSSProperties, useContext } from "react";

interface Props {
  sx: CSSProperties;
}
export function ColorModeToggle({ sx }: Props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton sx={{ ...sx }} onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
