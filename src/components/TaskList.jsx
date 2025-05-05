import React from 'react'

const TaskList = () => {
    return (
        <ul className ="space-y-4">
            <li className = "bg-gray-100 px-4 py-2 border-1 border-gray-300 rounded-2xl flex items-start justify-between">
                <div>
                    <p className = "text-gray-800 font-medium">Finish Appwrite Setup</p>
                    <span className = "text-xs text-gray-600">Category: Work</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-green-500 hover:text-green-700" title="Mark Complete">✔️</button>
                    <button className="text-blue-500 hover:text-blue-700" title="Edit Task">✏️</button>
                    <button className="text-red-500 hover:text-red-700" title="Delete Task">🗑️</button>
                </div>
            </li>
            <li className="bg-gray-100 px-4 py-2 border-1 border-gray-300 rounded-2xl flex items-start justify-between">
                <div>
                    <p className="text-gray-800 font-medium line-through">Buy groceries</p>
                    <span className="text-xs text-gray-500">Category: Personal</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-green-500 hover:text-green-700" title="Mark Complete">✔️</button>
                    <button className="text-blue-500 hover:text-blue-700" title="Edit Task">✏️</button>
                    <button className="text-red-500 hover:text-red-700" title="Delete Task">🗑️</button>
                </div>
            </li>
        </ul>

    )
}
export default TaskList
