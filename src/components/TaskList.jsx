import React, {useEffect, useState} from 'react'
import {databaseId,databases,collectionId} from "../appwrite/appwriteConfig.js";
import {ThreeDot} from "react-loading-indicators";
import AddTask from "./AddTask.jsx";
import EditIcon from "../assets/edit.svg"
import DeleteIcon from "../assets/bin.svg"
import DoneIcon from "../assets/done.svg"

const TaskList = ({refetchTrigger, filterCategory}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await databases.listDocuments(
                    databaseId,
                    collectionId
                );
                setTasks(response.documents);
                setLoading(false);
            } catch (e) {
                console.log('Error fetching tasks: ', e)
                setError('Failed to load tasks.');
                setLoading(false);
            }
        }
        fetchTasks();
    }, [refetchTrigger]);//Empty dependency array ensures this runs only once after the initial render.

    const handleComplete = async (taskId, isCurrentlyCompleted) => {
        try {
            await databases.updateDocument(
                databaseId,
                collectionId,
                taskId,
                {isCompleted: !isCurrentlyCompleted}
            );

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.$id === taskId ? {...task, isCompleted: !isCurrentlyCompleted} : task
                )
            )
        } catch (error) {
            console.log('Error updating task completion', error)
            setError('Failed to update task completion')
        }
    }

    const handleDelete = async (taskId) =>{
        try{
            await databases.deleteDocument(
                databaseId,
                collectionId,
                taskId
            );
            setTasks(prevTask =>
                prevTask.filter((task) => task.$id !==taskId)
            )
        }catch (e) {
            console.log("Error deleting task: ", e)
            setError("Failed to delete task.")
        }
    }

    const handleEdit = (task) =>{
        setEditingTask(task)
    };

    const handleCloseModal = () =>{
        setEditingTask(null)
    }
    //New callback to update task State after editing
    const handleTaskUpdated = (updateTask)=>{
       setTasks(prevTasks=>
           prevTasks.map(task=>
             task.$id === updateTask.$id?{...task, ...updateTask}:task
           )
       ) ;
       setEditingTask(null);
    }

    const filteredTasks = filterCategory === 'all'
        ? tasks
        : tasks.filter(task=>task.category.toLowerCase()===filterCategory);

    if(loading){
        return <div className="flex items-center justify-around">
            <ThreeDot variant="bounce" color="#444273" size="medium" text="Wait A moment" textColor="" />
        </div>;//I should put a loader
    }

    if (error){
        return <p className="text-red-500">{error}</p>
    }

    return (
        <>
            <ul className ="space-y-4">
                {filteredTasks.map((task) =>(
                    <li key = {task.$id} className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-2xl flex items-start justify-between">
                        <div>
                            <p className={`text-gray-800 font-medium ${task.isCompleted ? 'line-through' : ''}`}>{task.title}</p>
                            <span className="text-xs text-gray-600">Category: {task.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-green-500 hover:text-green-700" title="Mark Complete" onClick={()=> handleComplete(task.$id, task.isCompleted)}>
                                <img src={DoneIcon} alt = "Delete Icon" className="w-[30px] h-[30px] cursor-pointer"/>
                            </button>
                            <button className="text-blue-500 hover:text-blue-700" title="Edit Task" onClick={() => handleEdit(task)}>
                                <img src={EditIcon} alt = "Edit Icon" className="w-[40px] h-[40px] cursor-pointer"/>
                            </button>
                            <button className="text-red-500 hover:text-red-700" title="Delete Task" onClick={() => handleDelete(task.$id)}>
                                <img src={DeleteIcon} alt = "Delete Icon" className="w-[30px] h-[30px] cursor-pointer"/>
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
                    onTaskUpdated={handleTaskUpdated} //Pass the callback
                />
            )}
        </>


    )
}
export default TaskList
