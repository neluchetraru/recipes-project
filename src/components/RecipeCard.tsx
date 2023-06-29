import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Box,
  Button,
  useTheme,
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
      <Card elevation={5} sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" image={image} src={title} height={200} />
        <CardHeader title={title} />
        <CardActions sx={{ marginTop: "auto" }}>
          <Button
            sx={{}}
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            See recipe
          </Button>
        </CardActions>
      </Card>
      {openModal && (
        <RecipeModal
          handleClose={() => setOpenModal(false)}
          open={openModal}
          id={id}
          title={title}
          image={image}
        />
      )}
    </>
  );
};

export default RecipeCard;
