import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import RecipeModal from "./RecipeModal";

interface Recipe {
  image: string;
  id: number;
  title: string;
}

const RecipeCard = ({ id, title, image }: Recipe) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card variant="outlined">
        <CardMedia component="img" image={image} src={title} height={200} />
        <CardHeader title={title} />
        <CardActions>
          <Button color="primary" onClick={() => setOpenModal(true)}>
            See recipe
          </Button>
        </CardActions>
      </Card>
      <RecipeModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        id={id}
      />
    </>
  );
};

export default RecipeCard;
