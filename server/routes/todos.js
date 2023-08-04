import express from 'express'
import Todo from '../mongodb/models/todo.js'

const router = express.Router()


router.post('/add', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTodo = new Todo({ title, description, status });

        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo)
    } catch (error) {
        res.status(500).json({ error: 'Error creating in new todos' })
    }
})

router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find();
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ error: 'Error fetching the todos' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { title, description, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(400).json({error: 'Error updating the todo'})
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.findByIdAndRemove(id).exec();
        res.status(200).json({ message: 'Todo deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error in deleting the todo' })
    }
})

export default router;



