import React from 'react'

const Header = ({onAddClick}) => {
    return (
        <div className= "flex items-center justify-between mb-6">
            <h1 className = "text-2xl font-bold text-gray-800">📝 Task Tracker</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 cursor-pointer focus:bg-blue-500"
                    onClick={onAddClick}>Add Task
            </button>
        </div>
    )
}
export default Header
