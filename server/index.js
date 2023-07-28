import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import initRoutes from "./routes/api.js";

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

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to database");
})
.catch((e) => {
    console.log(e);
})

initRoutes(app);
