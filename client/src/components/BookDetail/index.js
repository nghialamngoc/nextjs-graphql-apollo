import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { getAuthor } from '../../graphql/queries';

const BookDetail = ({ book }) => {
  const { loading, error, data } = useQuery(getAuthor, {
    variables: { authorId: book?.author?.id ?? '' },
  });

  if (!book) {
    return <></>;
  }

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return error.message;
  }

  return (
    <Flex direction="column">
      <Box>{book.name}</Box>
      <Box fontSize={17}>{book.genre}</Box>
      <Flex direction="column" fontSize={17}>
        <Box>{book.author.name}</Box>
        <Box>{book.author.age}</Box>
        <Flex direction="column" mt={3}>
          <Box>All books by this author</Box>
          <Flex direction="column" pl={3}>
            {data.author.books.map(book => (
              <Box key={book.id}>{book.name}</Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookDetail;
