import { ApolloServer } from '@apollo/server';
import express, { Application, Request, Response } from 'express';
import { schema } from '@graphql/schema/schema';
import resolvers from '@graphql/resolvers/resolvers';

const app: Application = express();
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Spotify!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('OOPS!! 404 page not found');
});

export default server;
