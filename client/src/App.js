import { Box, ChakraProvider, Flex, theme } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Flex direction="column" minH="100vh" p={3}>
            <Flex justifyContent="flex-end">
              <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
            <Box flexGrow={1}>
              <BookList></BookList>
            </Box>
          </Flex>
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
