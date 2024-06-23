require('tsconfig-paths/register');
import server from "@src/app";
import dbConnection from "@src/config/dbConnection";
import { config } from "dotenv";
import { startStandaloneServer } from '@apollo/server/standalone';
import { Connection } from "mongoose";
config();

const PORT: number = Number(process.env.PORT) || 3000;

dbConnection()
    .then((connection: Connection | undefined) => {
        // app.listen(PORT, () => {
        //     console.log(`Server is starting...${PORT}`);
        //     console.log(`DB is connected Successfully...${connection?.host}`);
        // });
        startStandaloneServer(server, {
            listen: {
                port: PORT
            }
        })
            .then(() => {
                console.log(`Server is working on port:${PORT}`);
                console.log(`DB is connected Successfully...${connection?.name}`);
            })
            .catch((error) => {
                console.error(error);
            })
    }).catch((err) => {
        console.error("Error connecting to the database:", err);
    });