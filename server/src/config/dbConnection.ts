import mongoose, { connect, Connection } from 'mongoose';

const dbConnection = async (): Promise<Connection | undefined> => {
  try {
    const { connection } = await connect(process.env.DB_URL!);

    if (connection) {
      return connection;
    }

    throw new Error('Failed to connect to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export default dbConnection;
