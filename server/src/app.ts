import { ApolloServer } from '@apollo/server';
import express, { Application, Request, Response } from 'express';
import { schema } from '@graphql/schema/schema';
import { getAllUser } from '@controllers/user.controller';

const app: Application = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      users: getAllUser,
    },
  },
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Spotify!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('OOPS!! 404 page not found');
});

export default server;
