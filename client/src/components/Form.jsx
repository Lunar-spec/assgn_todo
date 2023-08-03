// components/Form.jsx
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, FormControl, InputLabel, MenuItem, Select, Paper } from '@mui/material';
import {useNavigate} from 'react-router-dom'

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To Do',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.post(`${apiUrl}/api/add`, formData);
            alert('Task added successfully!');
            setFormData({
                title: '',
                description: '',
                status: 'To Do',
            });
            navigate('/')
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit task. Please try again.');
        }
    };

    return (
        <Container maxWidth="md" style={{marginTop: '70px'}}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <h1 style={{textAlign: 'center'}}>Add a Task</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select
                            label="Status"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="To Do">To Do</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Add Task
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;
