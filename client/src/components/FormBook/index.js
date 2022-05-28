import { useQuery, useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createBook } from '../../graphql/mudations';
import { getAuthors, getBooks } from '../../graphql/queries';

const FormBook = () => {
  const { data } = useQuery(getAuthors);
  const [addBook, dataMutation] = useMutation(createBook);

  const [form, setForm] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const authors = data?.authors;

  const onFormChange = (name, value) => {
    setForm(pre => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    addBook({
      variables: {
        authorId: form.authorId,
        name: form.name,
        genre: form.genre,
      },
      refetchQueries: [{ query: getBooks }],
    });
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel htmlFor="bookName">Book Name</FormLabel>
        <Input
          id="bookName"
          value={form.name}
          onChange={e => onFormChange('name', e.target.value)}
        />
        <FormHelperText>Your book's name.</FormHelperText>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="bookGenre">Book genre</FormLabel>
        <Input
          id="bookGenre"
          value={form.genre}
          onChange={e => onFormChange('genre', e.target.value)}
        />
        <FormHelperText>Your book's genre.</FormHelperText>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="author">Author</FormLabel>
        <Select
          id="author"
          placeholder="Select author"
          value={form.authorId}
          onChange={e => onFormChange('authorId', e.target.value)}
        >
          {authors?.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <FormHelperText>Your book's author.</FormHelperText>
      </FormControl>

      <Button mb={4} onClick={e => onSubmit(e)} disabled={dataMutation.loading}>
        Add Book
      </Button>
    </>
  );
};

export default FormBook;
