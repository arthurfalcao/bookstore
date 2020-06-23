const endpoint = process.env.REACT_APP_API_URL;

/**
 * Pega o author na coleção secreta metadados atraves do firebase functions
 * @param bookId Id do livro que iremos consultar
 */
export const getBookAuthorApi = async (bookId: string) => {
  const response = await fetch(`${endpoint}?bookId=${bookId}`);
  const json = await response.json();
  return json.author;
};
