const Author = require("../models/Author");
const Book = require("../models/Book");

const mogoDataMethods = {
  getAllBooks: async () => await Book.find(),
  getBookById: async (id) => await Book.findById(id),
  getAllBooksByAuthorId: async (id) => await Book.find({ authorId: id }),
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (id) => await Author.findById(id),
};

module.exports = mogoDataMethods;
