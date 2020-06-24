import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export const BookWrapper = styled(Card)({
  height: "100%",
});

export const BookActionArea = styled(CardActionArea)({
  height: "100%",
});

export const BookContent = styled(CardContent)({
  padding: 16,
});

export const BookTitle = styled(Typography)({
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "1s",
  "&:hover": {
    whiteSpace: "initial",
  },
});

export const BookImageLoading = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "21rem",
});

export const BookImage = styled(CardMedia)({
  height: "21rem",
});
