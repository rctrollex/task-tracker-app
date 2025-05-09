import React, { useEffect, useState } from 'react';
import { databases, collectionId, databaseId } from "../appwrite/appwriteConfig.js";

const AddTask = ({ onClose, taskId, initialTitle = '', initialCategory = '', onTaskUpdated }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState(initialCategory);

    useEffect(() => {
        setTitle(initialTitle);
        setCategory(initialCategory);
    }, [initialTitle, initialCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !category) {
            setErrorMessage('Please fill all the fields.');
            return;
        }
        setErrorMessage('');

        try {
            if (taskId) {
                const updatedTask = await databases.updateDocument(
                    databaseId,
                    collectionId,
                    taskId,
                    {
                        title: title,
                        category: category,
                    }
                );
                onTaskUpdated(updatedTask);
                console.log('Task updated: ', updatedTask);
            } else {
                const newTask = await databases.createDocument(
                    databaseId,
                    collectionId,
                    'unique()',
                    {
                        title: title,
                        category: category,
                        isCompleted: false,
                    }
                );
                console.log('Task added: ', newTask);
            }
            onClose();
        } catch (e) {
            console.log('Error adding/updating task: ', e);
            setErrorMessage('Failed to save task. Please try again');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-4 sm:p-6 rounded-md shadow-md w-11/12 max-w-md">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                    {taskId ? 'Edit Task' : 'Add New Task'}
                </h2>
                {errorMessage && <p className="text-red-500 text-xs sm:text-sm mb-2">{errorMessage}</p>}
                <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                            Task Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Task Title"
                            required
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                            Category
                        </label>
                        <select
                            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            required
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-end justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="text-white bg-red-400 py-1.5 px-2 sm:px-3 rounded-xl active:bg-red-600 text-xs sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-green-400 py-1.5 px-2 sm:px-3 rounded-xl active:bg-green-600 text-xs sm:text-sm"
                        >
                            {taskId ? 'Save Changes' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;