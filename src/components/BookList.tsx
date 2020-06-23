import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Loading from "./Loading";
import { IFirestoreBook } from "../services/types";
import { fbFirestore } from "../services/firebase";

import Book from "./Book";

function useBooks() {
  const [books, setBooks] = useState<Record<string, IFirestoreBook>>({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setStatus("pending");
        const querySnapshot = await fbFirestore.collection("books").get();

        const docBooks = querySnapshot.docs.reduce(
          (acc, book) => ({ ...acc, [book.id]: book.data() }),
          {}
        );
        setBooks(docBooks);
        setStatus("resolved");
      } catch (err) {
        setStatus("rejected");
      }
    };

    fetchBooks();
  }, []);

  return {
    books,
    isLoading: status === "idle" || status === "pending",
    isIdle: status === "idle",
    isPending: status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
  };
}

/**
 * Renderiza a lista de livros do firestore
 */
const BookList: React.FC = () => {
  const { books, isLoading } = useBooks();

  return (
    <>
      <Loading isLoading={isLoading} />

      <Box p={2}>
        <Grid container spacing={2}>
          {Object.entries(books).map(([key, value]) => (
            <Grid sm={6} xs={6} md={2} lg={3} item key={key}>
              <Book id={key} {...value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BookList;
