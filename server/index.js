import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initRoutes from "./app/routes.js";
import initDatabase from "./app/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Handle syntax error in request json data
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: "Syntax error",
        });
    }

    next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

initDatabase();

initRoutes(app);
