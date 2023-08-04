import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })

        .then(() => console.log('⚡Bolt touched the server⚡'))
        .catch((err) => console.log(err))
}

export default connectDB;