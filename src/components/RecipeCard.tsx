import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import RecipeModal from "./RecipeModal";
import { RecipeSimple } from "../entities";

const RecipeCard = ({ recipe }: { recipe: RecipeSimple }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card elevation={5} sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={recipe.image}
          src={recipe.title}
          height={200}
        />
        <CardHeader title={recipe.title} />
        <CardActions sx={{ marginTop: "auto" }}>
          <Button
            sx={{}}
            variant="contained"
            onClick={() => setOpenModal(true)}
            color="secondary"
          >
            See recipe
          </Button>
        </CardActions>
      </Card>
      {openModal && (
        <RecipeModal
          handleClose={() => setOpenModal(false)}
          open={openModal}
          recipe={recipe}
        />
      )}
    </>
  );
};

export default RecipeCard;
