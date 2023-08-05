import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initRoutes from "./app/routes.js";
import initDatabase from "./app/database.js";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { __dirname } from './app/dirname.js';

dotenv.config();

const app = express();

app.use(express.static('public'));

app.use(cors({
    credentials: true, origin: [
        "http://localhost:3000",
        "http://localhost:8000",
    ]
}));

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

// Handle syntax error in request json data
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: "Syntax error",
        });
    }

    next();
});

initDatabase();

initRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})