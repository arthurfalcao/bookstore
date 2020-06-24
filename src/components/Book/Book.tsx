import React, { useState, useEffect, useMemo } from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { IFirestoreBook } from "../../services/types";
import { getBookAuthorApi } from "../../services/api";

import * as S from './styled';

interface IBookProps extends IFirestoreBook {
  id: string;
}

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<IBookProps> = ({ id, name, price }) => {
  const [author, setAuthor] = useState('');

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
      <S.BookContent>
        <S.BookTitle gutterBottom>{name}</S.BookTitle>
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
      </S.BookContent>
    </Card>
  );
};

export default Book;
