import * as React from "react";
import Container from "@material-ui/core/Container";

import BookList from "./components/BookList";

export default function App() {
  return (
    <Container>
      <BookList />
    </Container>
  );
}
