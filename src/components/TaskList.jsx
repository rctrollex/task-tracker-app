import React, { useEffect, useState } from 'react';
import { databaseId, databases, collectionId } from "../appwrite/appwriteConfig.js";
import { ThreeDot } from "react-loading-indicators";
import AddTask from "./AddTask.jsx";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/bin.svg";
import DoneIcon from "../assets/done.svg";

const TaskList = ({ refetchTrigger, filterCategory }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await databases.listDocuments(databaseId, collectionId);
                setTasks(response.documents);
                setLoading(false);
            } catch (e) {
                console.log('Error fetching tasks: ', e);
                setError('Failed to load tasks.');
                setLoading(false);
            }
        };
        fetchTasks();
    }, [refetchTrigger]);

    const handleComplete = async (taskId, isCurrentlyCompleted) => {
        try {
            await databases.updateDocument(databaseId, collectionId, taskId, {
                isCompleted: !isCurrentlyCompleted,
            });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.$id === taskId ? { ...task, isCompleted: !isCurrentlyCompleted } : task
                )
            );
        } catch (error) {
            console.log('Error updating task completion', error);
            setError('Failed to update task completion');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await databases.deleteDocument(databaseId, collectionId, taskId);
            setTasks(prevTasks => prevTasks.filter((task) => task.$id !== taskId));
        } catch (e) {
            console.log("Error deleting task: ", e);
            setError("Failed to delete task.");
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleCloseModal = () => {
        setEditingTask(null);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.$id === updatedTask.$id ? { ...task, ...updatedTask } : task
            )
        );
        setEditingTask(null);
    };

    const filteredTasks = filterCategory === 'all'
        ? tasks
        : tasks.filter(task => task.category.toLowerCase() === filterCategory);

    if (loading) {
        return (
            <div className="flex items-center justify-around">
                <ThreeDot variant="bounce" color="#444273" size="medium" text="Wait A moment" textColor="" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-sm sm:text-base">{error}</p>;
    }

    return (
        <>
            <ul className="space-y-3">
                {filteredTasks.map((task) => (
                    <li
                        key={task.$id}
                        className="bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-2xl flex items-start justify-between"
                    >
                        <div>
                            <p className={`text-gray-800 font-medium text-sm sm:text-base ${task.isCompleted ? 'line-through' : ''}`}>
                                {task.title}
                            </p>
                            <span className="text-xs sm:text-sm text-gray-600">Category: {task.category}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                className="text-green-500 active:text-green-700"
                                title="Mark Complete"
                                onClick={() => handleComplete(task.$id, task.isCompleted)}
                            >
                                <img src={DoneIcon} alt="Done Icon" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                            </button>
                            <button
                                className="text-blue-500 active:text-blue-700"
                                title="Edit Task"
                                onClick={() => handleEdit(task)}
                            >
                                <img src={EditIcon} alt="Edit Icon" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
                            </button>
                            <button
                                className="text-red-500 active:text-red-700"
                                title="Delete Task"
                                onClick={() => handleDelete(task.$id)}
                            >
                                <img src={DeleteIcon} alt="Delete Icon" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingTask && (
                <AddTask
                    onClose={handleCloseModal}
                    taskId={editingTask.$id}
                    initialTitle={editingTask.title}
                    initialCategory={editingTask.category}
                    onTaskUpdated={handleTaskUpdated}
                />
            )}
        </>
    );
};

export default TaskList;