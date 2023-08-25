import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './TodoList.scss';
import PopUp from '../components/PopUp';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${apiUrl}/api`);
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

    const handleClosePopUp = () => {
        setShowPopUp(false);
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

    const statusGroups = {
        'To Do': [],
        'In Progress': [],
        'Completed': []
    };

    tasks.forEach(task => {
        statusGroups[task.status].push(task);
    });

    const onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const updatedTasks = { ...statusGroups };

        const [reorderedTask] = updatedTasks[result.source.droppableId].splice(result.source.index, 1);
        updatedTasks[result.destination.droppableId].splice(result.destination.index, 0, reorderedTask);

        const newStatus = result.destination.droppableId;

        const updatedTask = { ...reorderedTask, status: newStatus };

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            
            await axios.put(`${apiUrl}/api/${updatedTask._id}`, updatedTask);
            setTasks(Object.values(updatedTasks).flat());
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="todo-list-container">
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(statusGroups).map((status) => (
                    <Droppable key={status} droppableId={status}>
                        {(provided) => (
                            <div className="status-column" ref={provided.innerRef} {...provided.droppableProps}>
                                <h2>{status}</h2>
                                {statusGroups[status].map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                className={"todo-item"}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
            {showPopUp && editedTask && (
                <PopUp task={editedTask} onClose={handleClosePopUp} onSave={handleSaveChanges} />
            )}
        </div>
    );
};

export default TodoList;
