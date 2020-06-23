import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Book from "./Book";
import { IFirestoreBook } from "../services/types";

/**
 * Renderiza a lista de livros do firestore
 */
const BookList: React.FC<{}> = () => {
  const [books, setBooks] = useState<Record<string, IFirestoreBook>>({});

  useEffect(() => {
    setBooks({});
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {Object.entries(books).map(([key, value]) => (
          <Grid sm={6} xs={6} md={2} lg={3} item key={key}>
            <Book />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default BookList;
