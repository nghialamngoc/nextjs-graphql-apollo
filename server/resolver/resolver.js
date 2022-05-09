const data = require("../data/data");

const resolvers = {
  Query: {
    books: () => data.books,
    book: (parent, args) => {
      const result = data.books.filter((x) => x.id === Number(args.id));
      return result[0];
    },
    authors: () => data.authors,
    author: (parent, args) => {
      const result = data.authors.filter((x) => x.id === Number(args.id));
      return result[0];
    },
  },
  Book: {
    author: (parent) => {
      const result = data.authors.filter(
        (x) => x.id === Number(parent.authorId)
      );
      return result[0];
    },
  },
  Author: {
    books: (parent) => {
      const result = data.books.filter(
        (x) => x.authorId === Number(parent.id)
      );
      return result;
    },
  },
};

module.exports = resolvers;
