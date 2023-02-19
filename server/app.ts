import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Env } from './config';
import { graphqlSchema } from './schema/schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Read .env file
dotenv.config();

// Connect to the Mongo DB
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Mongoose URI is not defined');
mongoose.connect(uri);
mongoose.connection.once('open', () => {
  console.log('Connected to the Mongo database');
});

// Start Node with Graphql
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({ schema: graphqlSchema, graphiql: Env.isDevelopment() })
);

app.listen(Env.server.PORT, () => {
  console.log(`Listening to requests on PORT: ${Env.server.PORT}`);
  console.log(`Development environment: ${Env.isDevelopment()}`);
});
