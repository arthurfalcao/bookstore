import { fbStorage } from "./firebase";

const endpoint = process.env.REACT_APP_API_URL;

/**
 * Pega o author na coleção secreta metadados atraves do firebase functions
 * @param bookId Id do livro que iremos consultar
 */
export const getBookAuthorApi = async (bookId: string) => {
  const response = await fetch(`${endpoint}/getBookAuthor?bookId=${bookId}`);
  const json = await response.json();
  return json.author;
};

export const getBookImageApi = async (bookId: string) => {
  return fbStorage.ref("books").child(`${bookId}.jpg`).getDownloadURL();
};
