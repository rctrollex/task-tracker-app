import React, {useState} from 'react'
import {databases,collectionId,databaseId} from "../appwrite/appwriteConfig.js";

const AddTask = ({onClose}) => {
    const [errorMessage, setErrorMessage] =useState('');


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;

        if(!title || !category){
            alert('Please fill in all fields');
            return;
        }
        setErrorMessage(''); //clear any error messages
        try{
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
            console.log('Task added: ',newTask);
            e.target.reset();// clear the form
            onClose();
            // Trigger a re-fetch of tasks.
        } catch (error) {
            console.log('Error adding task: ', error);
            setErrorMessage('Failed to add task. Please try again.')
        }
        console.log('Task to add: ', {title, category});
    }

    return (
        <div className = "fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className = "bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className = "text-lg font-semibold mb-4 text-gray-800">Add New Task</h2>
                {errorMessage && <p className = "text-red-500 mb-2">{errorMessage}</p>}
                <form className = "space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className = "block text-sm font-medium text-gray-700 px-4 py-2" htmlFor="title" >Task Title</label>
                        <input
                            type = "text" placeholder = "Enter Task Title" required name = "title" id = "title"
                            className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700 px-4 py-2" htmlFor="category">Category</label>
                        <select className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500" required name = "category" id="category">
                            <option value = "">Select Category</option>
                            <option value = "work">Work</option>
                            <option value = "personal">Personal</option>
                            <option value = "others">Others</option>
                        </select>
                    </div>

                    <div className = "flex flex-row items-end justify-end gap-2 pt-2">
                        <button type = "button" className = "text-white hover:underline bg-red-400 py-2 px-3 rounded-r-xl" onClick = {onClose}>Cancel</button>
                        <button type = "submit" className = "text-white hover:underline bg-green-400 py-2 px-3 rounded-s-xl" >Add Task</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
export default AddTask
