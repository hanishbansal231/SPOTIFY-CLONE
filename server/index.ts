require('tsconfig-paths/register');
import app from "@src/app";
import dbConnection from "@src/config/dbConnection";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;

dbConnection().then((result: any) => {
    app.listen(PORT, () => {
        console.log(`Server is starting...${PORT}`);
    });
}).catch((err: any) => {

});