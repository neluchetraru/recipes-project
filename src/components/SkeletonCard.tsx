import { Card, Skeleton } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Card
      elevation={5}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Skeleton width="100%" height={200} variant="rectangular" />
      <Skeleton
        width="100%"
        height={50}
        variant="rectangular"
        sx={{ marginTop: 3 }}
      />
      <Skeleton
        width="130px"
        height={38}
        variant="rectangular"
        sx={{ marginTop: 5, ml: 1, mb: 1 }}
      />
    </Card>
  );
};

export default SkeletonCard;
