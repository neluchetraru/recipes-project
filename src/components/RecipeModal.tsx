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
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useRecipe from "../hooks/useRecipe";
import useUserQueryStore from "../store";
import { RecipeSimple } from "../entities";

interface Props {
  open: boolean;
  handleClose: () => void;
  recipe: RecipeSimple;
}

const RecipeModal = ({
  open,
  handleClose,
  recipe: { id, title, image },
}: Props) => {
  const userFavorites = useUserQueryStore((s) => s.userQuery.userFavorites);
  const deleteUserFavorites = useUserQueryStore((s) => s.deleteUserFavorite);
  const addUserFavorites = useUserQueryStore((s) => s.addUserFavorite);
  const [saved, setSaved] = useState(
    userFavorites.find((favorite: number) => favorite === id) ? true : false
  );

  const { data, isLoading } = useRecipe(id);

  const toggleSave = () => {
    if (saved) {
      deleteUserFavorites(id);
    } else {
      addUserFavorites(id);
    }
    setSaved(!saved);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        color: "text.primary",
        overflow: "scroll",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "background.default",
          my: 10,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{title}</Typography>
          <Box display="flex">
            <Tooltip title={saved ? "Unsave" : "Save"}>
              <IconButton onClick={toggleSave}>
                {saved ? (
                  <Favorite fontSize="large" color="secondary" />
                ) : (
                  <FavoriteBorder fontSize="large" color="secondary" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={handleClose} color="secondary">
                <CloseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            {" "}
            <Grid container spacing={2} my={1}>
              <Grid sm={4} xs={12}>
                <Card>
                  <CardMedia component="img" src={image} />
                </Card>
                <Typography variant="h5" mt={2}>
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
            <Divider />
            <Box display="flex" my={1} alignItems="center">
              <LabelIcon color="primary" />
              {data?.dishTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{ ml: 1 }}
                  color="secondary"
                ></Chip>
              ))}
            </Box>
            <Divider />
          </>
        )}
      </Container>
    </Modal>
  );
};

export default RecipeModal;
