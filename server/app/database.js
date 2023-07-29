import mongoose from 'mongoose';

const initDatabase = () => {
    mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to database");
})
.catch((e) => {
    console.log(e);
})
}

export default initDatabase;