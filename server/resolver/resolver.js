const data = require("../data/data");
const Author = require("../models/Author");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    books: (parent, args, context) => {
      return context.mogoDataMethods.getAllBooks();
    },
    book: (parent, args, context) => {
      return context.mogoDataMethods.getBookById(args.id);
    },
    authors: (parent, args, context) => {
      return context.mogoDataMethods.getAllAuthors();
    },
    author: (parent, args, context) => {
      return context.mogoDataMethods.getAuthorById(args.id);
    },
  },
  Book: {
    author: (parent, args, context) => {
      console.log(parent.authorId);
      return context.mogoDataMethods.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: (parent, args, context) => {
      return context.mogoDataMethods.getAllBooksByAuthorId(parent.id);
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },
    createBook: async (parent, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
  },
};

module.exports = resolvers;
