import { gql } from '@apollo/client';

const createBook = gql`
  mutation createBook($authorId: ID!, $name: String, $genre: String) {
    createBook(authorId: $authorId, name: $name, genre: $genre) {
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

const createAuthor = gql`
  mutation createAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      age
      name
    }
  }
`;

export { createBook, createAuthor };
