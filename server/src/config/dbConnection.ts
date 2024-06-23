import mongoose, { connect } from "mongoose";

const dbConnection = async () => {
    try {
        const { connection } = await connect(process.env.DB_URL ?? '');

        if (connection) {
            console.log(`DB is connected Successfully...${connection.host}`)
        }

        return connection;

    } catch (error) {
        console.log(error);
        console.error(error);
        process.exit(1);
    }
}

export default dbConnection;
