import React, {useEffect, useState} from 'react'
import {databaseId,databases,collectionId} from "../appwrite/appwriteConfig.js";

const TaskList = ({refetchTrigger}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
       const fetchTasks = async() =>{
           try{
               const response = await databases.listDocuments(
                   databaseId,
                   collectionId
               );
               setTasks(response.documents);
               setLoading(false);
           }catch (e) {
               console.log('Error fetching tasks: ',e)
               setError('Failed to load tasks.');
               setLoading(false);
           }
       }
       fetchTasks();
    }, [refetchTrigger]);//Empty dependency array ensures this runs only once after the initial render.

    if(loading){
        return <p>Loading Tasks....</p>//I should put a loader
    }

    if (error){
        return <p className="text-red-500">{error}</p>
    }
    return (
        <ul className ="space-y-4">
            {tasks.map((task) =>(
                <li key = {task.$id} className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-2xl flex items-start justify-between">
                    <div>
                        <p className={`text-gray-800 font-medium ${task.isCompleted ? 'line-through' : ''}`}>{task.title}</p>
                        <span className="text-xs text-gray-600">Category: {task.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-green-500 hover:text-green-700" title="Mark Complete">✔️</button>
                        <button className="text-blue-500 hover:text-blue-700" title="Edit Task">✏️</button>
                        <button className="text-red-500 hover:text-red-700" title="Delete Task">🗑️</button>
                    </div>

                </li>
            ))}
        </ul>

    )
}
export default TaskList
