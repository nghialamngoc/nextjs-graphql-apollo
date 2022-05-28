import { useQuery } from '@apollo/client';
import { Box, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getBooks } from '../../graphql/queries';
import BookDetail from '../BookDetail';
import FormAuthor from '../FormAuthor';
import FormBook from '../FormBook';

const BookList = props => {
  const { loading, error, data } = useQuery(getBooks);
  const [bookSelected, setBookSelected] = useState(data ? data.books[0] : null);

  useEffect(() => {
    if (!bookSelected && data && data.books) {
      setBookSelected(data.books[0]);
    }
  }, [data, bookSelected]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return error.message;
  }

  return (
    <Box p={6}>
      <Grid templateColumns="1fr 1fr" mb={6} columnGap={12}>
        <GridItem>
          <FormBook></FormBook>
        </GridItem>

        <GridItem>
          <FormAuthor></FormAuthor>
        </GridItem>
      </Grid>
      <Grid templateColumns="8fr 4fr" columnGap={6}>
        <GridItem borderRight="1px solid">
          <Grid
            templateColumns="repeat(4, 1fr)"
            columnGap={6}
            rowGap={6}
            pr={6}
          >
            {data.books.map(item => {
              return (
                <GridItem
                  key={item.id}
                  border="1px solid"
                  borderRadius={5}
                  p={3}
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => setBookSelected(item)}
                >
                  {item.name}
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
        <GridItem>
          <BookDetail book={bookSelected}></BookDetail>
        </GridItem>
      </Grid>
    </Box>
  );
};

BookList.propTypes = {};

export default BookList;
