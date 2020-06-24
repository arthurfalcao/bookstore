import { styled } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const BookContent = styled(CardContent)({
  padding: 8,
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
