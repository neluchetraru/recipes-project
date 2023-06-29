import {
  Container,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
  Card,
  CardMedia,
  Tooltip,
  Chip,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useRecipe from "../hooks/useRecipe";
interface Props {
  open: boolean;
  handleClose: () => void;
  id: number;
  title: string;
  image: string;
}

const RecipeModal = ({ open, handleClose, id, title, image }: Props) => {
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("userFavorites") || "[]").find(
      (favorite: number) => favorite === id
    )
  );

  const { data, isLoading } = useRecipe(id);

  const toggleSave = () => {
    setSaved(!saved);
    const userFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "[]"
    );
    if (!saved) {
      localStorage.setItem(
        "userFavorites",
        JSON.stringify([...userFavorites, id])
      );
    } else {
      let userFavorites = JSON.parse(
        localStorage.getItem("userFavorites") || "[]"
      );
      userFavorites = userFavorites.filter(
        (favorite: number) => favorite !== id
      );

      console.log(userFavorites);
      localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ color: "black", overflow: "scroll" }}
    >
      <Container
        maxWidth="sm"
        sx={{ background: "white", mt: 20, padding: 3, borderRadius: 2 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize="30px">{title}</Typography>
          <Box display="flex">
            <Tooltip title={saved ? "Unsave" : "Save"}>
              <IconButton onClick={toggleSave}>
                {saved ? (
                  <Favorite fontSize="large" />
                ) : (
                  <FavoriteBorder fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} my={1}>
            <Grid sm={4} xs={12}>
              <Card>
                <CardMedia component="img" src={image} />
              </Card>
              <Typography variant="body2" mt={2}>
                Ingredients:
              </Typography>
              <List>
                {data?.extendedIngredients.map((ingredient) => (
                  <ListItem key={ingredient.original}>
                    {ingredient.original}
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid sm={8} xs={12}>
              <Typography variant="h5">Method:</Typography>
              <List>
                {data?.analyzedInstructions[0].steps.map((instruction) => (
                  <ListItem key={instruction.number}>
                    {instruction.step}
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        <Divider />
        <Box display="flex" my={1}>
          <LabelIcon />
          {data?.dishTypes.map((type) => (
            <Chip key={type} label={type} sx={{ ml: 1 }}></Chip>
          ))}
        </Box>
        <Divider />
      </Container>
    </Modal>
  );
};

export default RecipeModal;
