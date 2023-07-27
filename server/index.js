const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const initRoutes = require("./routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
