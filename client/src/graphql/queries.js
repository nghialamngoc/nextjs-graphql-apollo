import { gql } from '@apollo/client';

const getBooks = gql`
  query getBooksQuery {
    books {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;

const getAuthors = gql`
  query getAuthorsQuery {
    authors {
      id
      name
      age
      books {
        id
        name
        genre
      }
    }
  }
`;

const getAuthor = gql`
  query getAuthor($authorId: ID!) {
    author(id: $authorId) {
      id
      name
      age
      books {
        id
        name
        genre
      }
    }
  }
`;

export { getBooks, getAuthor, getAuthors };
