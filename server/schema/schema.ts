import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  buildSchema,
} from 'graphql';

const dummyBooks = [
  { title: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { title: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { title: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { title: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { title: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { title: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

const dummyAuthors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const request = dummyAuthors.find(
          (author) => author.id === parent.authorId
        );
        return request;
      },
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        const request = dummyBooks.filter(
          (book) => book.authorId === parent.id
        );
        return request;
      },
    },
  }),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const request = dummyBooks.find((book) => book.id === args.id);
        console.log(request);
        return request;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const request = dummyAuthors.find((author) => author.id === args.id);
        console.log(request);
        return request;
      },
    },
  },
});

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
});
