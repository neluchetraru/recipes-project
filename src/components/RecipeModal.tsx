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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
} from "@mui/icons-material";
interface Props {
  open: boolean;
  handleClose: () => void;
  id: number;
}

interface Recipe {
  dishTypes: [string];
  readyInMinutes: number;
  servings: number;
  extendedIngredients: [ExtendedIngredients];
  instructions: string;
}

interface ExtendedIngredients {
  name: string;
  original: string;
}

const RecipeModal = ({ open, handleClose, id }: Props) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => setSaved(!saved);
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
          <Typography fontSize="30px">Pasta Carbonara</Typography>
          <Box display="flex">
            <Tooltip title={saved ? "Unsave" : "Save"}>
              <IconButton onClick={handleSave}>
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
        <Grid container spacing={2} my={1}>
          <Grid sm={4} xs={12}>
            <Card>
              <CardMedia
                component="img"
                src="https://spoonacular.com/recipeImages/749013-312x231.jpeg"
              />
            </Card>
            <Typography variant="body2" mt={2}>
              Ingredients:
            </Typography>
            <List>
              <ListItem>fdsd</ListItem>
              <ListItem>fdsd</ListItem>
              <ListItem>fdsd</ListItem>
              <ListItem>fdsd</ListItem>
            </List>
          </Grid>
          <Grid sm={8} xs={12}>
            <Typography variant="body2">Method:</Typography>
            <Typography variant="caption">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              voluptate quisquam quo. Cupiditate quia quibusdam perspiciatis
              repellendus velit, voluptatum dolore assumenda placeat nobis
              explicabo harum, earum adipisci quis deleniti accusamus. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime
              necessitatibus ullam eaque ea enim hic quos minus possimus
              sapiente soluta, aliquam, atque qui totam dignissimos! Quisquam
              accusantium eligendi quo! Esse adipisci ad et tempore quae a!
              Assumenda eligendi dolore cumque vel, corrupti molestiae. Amet,
              culpa cum aliquid, ad reprehenderit voluptatum quis dignissimos,
              temporibus ipsa facere aspernatur. Dolorem obcaecati alias vitae
              debitis iste, explicabo temporibus earum facilis molestiae autem
              delectus, iure architecto commodi necessitatibus soluta velit.
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box display="flex" my={1}>
          <LabelIcon />
          <Typography ml={1}>dinner, meat, gluten free</Typography>
        </Box>
        <Divider />
      </Container>
    </Modal>
  );
};

export default RecipeModal;
