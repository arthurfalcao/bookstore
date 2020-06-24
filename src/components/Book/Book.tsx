import React, { useState, useEffect, useMemo } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { IFirestoreBook } from "../../services/types";
import { getBookAuthorApi, getBookImageApi } from "../../services/api";
import { ReactComponent as BookPlaceholder } from "../../assets/placeholder.svg";

import * as S from "./styled";

function useBookImage(bookId: string) {
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchBookImage = async () => {
      try {
        setStatus("pending");
        const imageData = await getBookImageApi(bookId);
        setImage(imageData);
        setStatus("resolved");
      } catch (err) {
        setStatus("rejected");
      }
    };

    if (bookId) fetchBookImage();
  }, [bookId]);

  return {
    image,
    isLoading: status === "idle" || status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
  };
}

interface IBookProps extends IFirestoreBook {
  id: string;
}

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<IBookProps> = ({ id, name, price }) => {
  const [author, setAuthor] = useState("");
  const { image, isLoading, isResolved, isRejected } = useBookImage(id);

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
    <S.BookWrapper>
      <S.BookActionArea>
        {isLoading && (
          <S.BookImageLoading>
            <CircularProgress />
          </S.BookImageLoading>
        )}

        {isRejected && (
          <S.BookImageLoading>
            <BookPlaceholder title={name} />
          </S.BookImageLoading>
        )}

        {isResolved && <S.BookImage image={image} title={name} />}

        <S.BookContent>
          <S.BookTitle gutterBottom>{name}</S.BookTitle>
          <Typography color="textSecondary" variant="caption" component="p">
            Autor(a): {author || "Desconhecido"}
          </Typography>

          <Typography color="textSecondary" variant="caption" component="p">
            {price ? `Preço: ${formattedPrice}` : "Gratuito"}
          </Typography>
        </S.BookContent>
      </S.BookActionArea>
    </S.BookWrapper>
  );
};

export default Book;
