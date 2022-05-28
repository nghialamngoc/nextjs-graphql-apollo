import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createAuthor } from '../../graphql/mudations';
import { getAuthors } from '../../graphql/queries';

const FormAuthor = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
  });
  const [addAuthor, dataMutation] = useMutation(createAuthor);

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
    addAuthor({
      variables: {
        name: form.name,
        age: form.age,
      },
      refetchQueries: [{ query: getAuthors }],
    });
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel htmlFor="authorName">Author Name</FormLabel>
        <Input
          id="authorName"
          value={form.name}
          onChange={e => onFormChange('name', e.target.value)}
        />
        <FormHelperText>Your author's name.</FormHelperText>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="authorAge">Author age</FormLabel>
        <Input
          id="authorAge"
          type="number"
          min={0}
          value={form.age}
          onChange={e => onFormChange('age', Number(e.target.value))}
        />
        <FormHelperText>Your author's genre.</FormHelperText>
      </FormControl>

      <Button mb={4} onClick={e => onSubmit(e)} disabled={dataMutation.loading}>
        Add Author
      </Button>
    </>
  );
};

export default FormAuthor;
