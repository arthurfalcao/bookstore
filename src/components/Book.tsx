import React, { useState, useEffect, useMemo } from "react";

import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { IFirestoreBook } from "../services/types";
import { getBookAuthorApi } from "../services/api";

const BookContent = styled(CardContent)({
  padding: 8,
});

const BookTitle = styled(Typography)({
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "1s",
  "&:hover": {
    whiteSpace: "initial",
  },
});

interface IBookProps extends IFirestoreBook {
  id: string;
}

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<IBookProps> = ({ id, name, price }) => {
  const [author, setAuthor] = useState();

  const formattedPrice = useMemo(() => {
    if (!price) return "";
    return Number(price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [price]);

  useEffect(() => {
    const fetchBookAuthor = async () => {
      const authorData = await getBookAuthorApi(id);
      setAuthor(authorData);
    };

    fetchBookAuthor();
  }, [id]);

  return (
    <Card>
      <BookContent>
        <BookTitle gutterBottom>{name}</BookTitle>
        {author && (
          <Typography color="textSecondary" variant="caption" component="p">
            Autor(a): {author}
          </Typography>
        )}

        {price && (
          <Typography color="textSecondary" variant="caption" component="p">
            Preço: {formattedPrice}
          </Typography>
        )}
      </BookContent>
    </Card>
  );
};

export default Book;
