import React from "react";
import RecipeCard from "./RecipeCard";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipesResponse } from "../hooks/useRecipes";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import SkeletonCard from "./SkeletonCard";

interface Props {
  data: InfiniteData<RecipesResponse> | undefined;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<RecipesResponse, unknown>
  >;
}

const RecipesGrid = ({
  data,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  if (isError)
    return (
      <Box>
        <Typography color="error" textAlign="center">
          An error has occured while fetching data from the server... Try again
          later!
        </Typography>
      </Box>
    );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <InfiniteScroll
      dataLength={data?.pages.length || 0}
      next={() => fetchNextPage()}
      loader={hasNextPage}
      hasMore
      style={{ overflow: "hidden" }}
    >
      <Grid container spacing={2} sx={{ mx: "50px" }}>
        {isLoading ? (
          <>
            {skeletons.map((skeleton) => (
              <Grid xs={12} sm={6} md={3} lg={2}>
                <SkeletonCard key={skeleton} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.results.map((recipe) => (
                  <React.Fragment key={recipe.id}>
                    <Grid xs={12} sm={6} md={3} lg={2} display="flex">
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </Grid>
    </InfiniteScroll>
  );
};

export default RecipesGrid;
