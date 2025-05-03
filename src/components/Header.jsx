import React from 'react'

const Header = ({onAddClick}) => {
    return (
        <>
            <div className= "flex items-center justify-between mb-6">
                <h1 className = "text-2xl font-bold text-gray-800">📝 Task Tracker</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 cursor-pointer focus:bg-blue-500"
                        onClick={onAddClick}>Add Task
                </button>
            </div>
            <div className = "flex flex-row mx-3 justify-start mb-6 space-x-2">
                <button className = "bg-blue-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-blue-400 hover:uppercase focus:bg-blue-500">
                    All
                </button>

                <button className = "bg-green-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-green-400 hover:uppercase focus:bg-green-500">
                    Work
                </button>

                <button className = "bg-yellow-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-yellow-400 hover:uppercase focus:bg-yellow-500">
                    Personal
                </button>

                <button className = "bg-purple-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-purple-400 hover:uppercase focus:bg-purple-500">
                    Others
                </button>

            </div>
        </>
    )
}
export default Header
