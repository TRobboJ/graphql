import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Env } from './config';
import { graphqlSchema } from './schema/schema';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({ schema: graphqlSchema, graphiql: Env.isDevelopment() })
);

app.listen(Env.server.PORT, () => {
  console.log(`Listening to requests on PORT: ${Env.server.PORT}`);
  console.log(`Development environment: ${Env.isDevelopment()}`);
});
