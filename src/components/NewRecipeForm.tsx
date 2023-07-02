import { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  ListItem,
  InputAdornment,
  IconButton,
  Button,
  CardMedia,
} from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import useUserQueryStore from "../store";

const NewRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "The title must be at least 5 characters")
    .max(
      50,
      "Hoo little explorer, the title must be at most 50 characters long"
    )
    .required("Please provide a title"),
  method: Yup.string().min(5, "The method is too short").required(),
  ingredients: Yup.array().of(Yup.string()),
  image: Yup.mixed().required("Image is required"),
});

interface Props {
  handleCancelClick: () => void;
}

interface FormValues {
  title: string;
  method: string;
  ingredients: string[];
  image: string;
  id: number;
}

const NewRecipeForm = ({ handleCancelClick }: Props) => {
  const [newIngredient, setNewIngredient] = useState("");
  const addUserRecipe = useUserQueryStore((s) => s.addUserRecipe);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      method: "",
      ingredients: [] as string[],
      image: "",
      id: Date.now(),
    },

    validationSchema: NewRecipeSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    addUserRecipe(values);
    if (formik.isValid) handleCancelClick();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          formik.setValues({
            ...formik.values,
            image: reader.result.toString(),
          });
        }
      };
    }
  };

  return (
    <>
      <Typography variant="h3" textAlign="center" color="text.primary">
        Add a new recipe
      </Typography>
      <FormControl sx={{ mt: 4 }} fullWidth>
        <Grid container display="flex" justifyContent="center">
          <Grid md={6} xs={10}>
            <TextField
              label="Title"
              sx={{ mt: 2 }}
              name="title"
              fullWidth
              color="secondary"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label="Method of preparation"
              sx={{ mt: 2 }}
              fullWidth
              multiline
              color="secondary"
              rows={4}
              value={formik.values.method}
              name="method"
              onChange={formik.handleChange}
              error={formik.touched.method && Boolean(formik.errors.method)}
              helperText={formik.touched.method && formik.errors.method}
            />
            <Box mt={2} mb={1} display="flex" alignItems="center">
              <ListIcon color="secondary" />
              <Typography ml={1} color="text.primary" variant="h5">
                List of ingredients
              </Typography>
            </Box>
            <Box>
              {formik.values.ingredients.map(
                (ingredient) =>
                  ingredient !== "" && (
                    <ListItem key={ingredient}>
                      <Typography ml={2} color="text.primary">
                        {ingredient}
                      </Typography>
                    </ListItem>
                  )
              )}
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={newIngredient === ""}
                        onClick={() => {
                          if (
                            formik.values.ingredients.find(
                              (ingredient) => ingredient === newIngredient
                            )
                          ) {
                            setNewIngredient("");
                            return;
                          }
                          formik.setValues({
                            ...formik.values,
                            ingredients: [
                              ...formik.values.ingredients,
                              newIngredient,
                            ],
                          });
                          setNewIngredient("");
                        }}
                        color="secondary"
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                placeholder="New ingredient"
                color="secondary"
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Button variant="outlined" component="label" color="secondary">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Button>
              <Typography ml={1} color="text.primary">
                {formik.values.image === "" && "No file selected"}
              </Typography>
            </Box>
            <Typography color="error">
              {formik.touched.image &&
                formik.errors.image !== "" &&
                formik.errors.image}
            </Typography>
            {formik.values.image !== "" && (
              <CardMedia
                sx={{ mt: 2 }}
                component="img"
                image={formik.values.image}
                alt="Wrong Format"
              />
            )}
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                Save
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

export default NewRecipeForm;
