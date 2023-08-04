import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './mongodb/connect.js';
import todoRoutes from './routes/todos.js';
dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api', todoRoutes);

app.get('/', async (req, res) => {
    res.send('The lighting has struck ⚡');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`⚡Thunderstorm at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();

// export default app;