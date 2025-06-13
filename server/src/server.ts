import express from 'express'
import colors from "colors";
import morgan from 'morgan'
import cors from "cors";

// CORS Config
import { CORSConfig } from './config/cors';

// Database config
import { db } from "./config/db";

// Routers
import authRouter from "./routes/authRouter";
import adminRouter from "./routes/adminRouter";
import transactionRouter from "./routes/transactionRouter";
import goalRouter from "./routes/goalRouter";

async function connectDB () {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue.bold("Connected to the database sucessfully"));
    } catch (error) {
        console.log(colors.red.bold(`Error while connecting to the database: ${error}`));
    }
}
connectDB();

const app = express()

app.use(cors(CORSConfig))
app.use(morgan('dev'))
app.use(express.json())

// Routers
app.use("/api/auth/", authRouter);
app.use("/api/admin/",
    adminRouter,
    transactionRouter,
    goalRouter
);

export default app