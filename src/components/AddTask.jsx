import React, {useEffect, useState} from 'react'
import {databases,collectionId,databaseId} from "../appwrite/appwriteConfig.js";

const AddTask = ({onClose, taskId, initialTitle = '', initialCategory = '',onTaskUpdated}) => {
    const [errorMessage, setErrorMessage] =useState('');
    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState(initialCategory);

    useEffect(() => {
        setTitle(initialTitle);
        setCategory(initialCategory);
    }, [initialTitle, initialCategory]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !category) {
            setErrorMessage('Please fill all the fields.')
            return;
        }
        setErrorMessage('')

        try {
            if (taskId) {
                // Editing an existing task
                const updatedTask = await databases.updateDocument(
                    databaseId,
                    collectionId,
                    taskId,
                    {
                        title: title,
                        category: category
                    }
                );
                //Call the callback to update the task state in TaskList
                onTaskUpdated(updatedTask);
                console.log('Task updated: ', updatedTask);
            } else {
                //add a new task
                const newTask = await databases.createDocument(
                    databaseId,
                    collectionId,
                    'unique()',
                    {
                        title: title,
                        category: category,
                        isCompleted: false
                    }
                );
                console.log('Task added: ', newTask)
            }
            onClose();
        }catch (e) {
            console.log('Error adding/updating task: ', e);
            setErrorMessage('Failed to save task. Please try again')
        }
    }

    return (
        <div className = "fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className = "bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className = "text-lg font-semibold mb-4 text-gray-800">{taskId ? 'Edit Task': 'Add New Task'}</h2>
                {errorMessage && <p className = "text-red-500 mb-2">{errorMessage}</p>}
                <form className = "space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className = "block text-sm font-medium text-gray-700 px-4 py-2" htmlFor="title" >Task Title</label>
                        <input
                            type = "text"
                            placeholder = "Enter Task Title"
                            required name = "title"
                            id = "title"
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                            className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700 px-4 py-2" htmlFor="category">Category</label>
                        <select className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500"
                                required
                                name = "category"
                                id="category"
                                value={category}
                                onChange={(e) =>setCategory(e.target.value)}
                        >

                            <option value = "">Select Category</option>
                            <option value = "work">Work</option>
                            <option value = "personal">Personal</option>
                            <option value = "others">Others</option>
                        </select>
                    </div>

                    <div className = "flex flex-row items-end justify-end gap-2 pt-2">
                        <button type = "button" className = "text-white hover:underline bg-red-400 py-2 px-3 rounded-r-xl" onClick = {onClose}>Cancel</button>
                        <button type = "submit" className = "text-white hover:underline bg-green-400 py-2 px-3 rounded-s-xl" >{taskId? 'Save Changes': 'Add Task'}</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
export default AddTask
