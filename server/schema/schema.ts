import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

const dummyData = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: 1 },
  { name: 'The Final Empire', genre: 'Fantasy', id: 2 },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: 3 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.id);
        const request = dummyData.find((data) => data.id === args.id);
        if (!request) throw new Error(`${args.id} returned no data`);
        console.log(request);
        return request;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.id);
      },
    },
  },
});

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
});
