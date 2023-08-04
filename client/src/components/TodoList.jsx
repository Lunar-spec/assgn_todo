import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './TodoList.scss';
import PopUp from '../components/PopUp';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${apiUrl}/`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.delete(`${apiUrl}/api/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task._id === id);
        if (taskToEdit) {
            setEditedTask(taskToEdit);
            setShowPopUp(true);
        }
    };

    const handleSaveChanges = async (updatedTask) => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.put(`${apiUrl}/api/${updatedTask._id}`, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
        setShowPopUp(false);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };

    return (
        <div className="todo-list-container">
            {tasks.map((task) => (
                <div key={task._id} className={"todo-item"}>
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="status-text" style={{ textAlign: 'center', color: task.status === 'To Do' ? '#E74C3C' : task.status === 'In Progress' ? '#FFBF00' : task.status === 'Completed' ? '#40E0D0' : 'transparent' }}>Status: {task.status}</div>
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit(task._id)}>
                            <EditIcon />
                        </button>
                        <button className="delete-button" onClick={() => handleDelete(task._id)}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            ))}
            {showPopUp && editedTask && (
                <PopUp task={editedTask} onClose={handleClosePopUp} onSave={handleSaveChanges} />
            )}
        </div>
    );
};

export default TodoList;
