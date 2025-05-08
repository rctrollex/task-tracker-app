import React from 'react'
import TaskLogo from '../assets/task.svg'

const Header = ({onAddClick, onFilterChange}) => {
    return (
        <>
            <div className= "flex items-center justify-between mb-6">
                <div className="flex justify-start space-x-4">
                    <img src={TaskLogo}alt = "Logo Icon" className="w-[40px] h-[40px]"/>
                    <h1 className = "text-2xl font-bold text-gray-800">
                         Task Tracker
                    </h1>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 cursor-pointer focus:bg-blue-500"
                        onClick={onAddClick}>Add Task
                </button>
            </div>
            <div className = "flex flex-row mx-3 justify-start mb-6 space-x-2">
                <button className = "bg-blue-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-blue-400 hover:uppercase focus:bg-blue-500"
                        onClick={()=>onFilterChange('all')}>
                    All
                </button>

                <button className = "bg-green-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-green-400 hover:uppercase focus:bg-green-500"
                        onClick={()=>onFilterChange('work')}>
                    Work
                </button>


                <button className = "bg-yellow-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-yellow-400 hover:uppercase focus:bg-yellow-500"
                        onClick={()=>onFilterChange('personal')}>
                    Personal
                </button>

                <button className = "bg-purple-200 py-1 px-3 font-light rounded-3xl cursor-pointer hover:bg-purple-400 hover:uppercase focus:bg-purple-500"
                        onClick={()=>onFilterChange('others')}>
                    Others
                </button>

            </div>
        </>
    )
}
export default Header
