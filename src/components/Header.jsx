import React from 'react';
import TaskLogo from '../assets/task.svg';

const Header = ({ onAddClick, onFilterChange }) => {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <img src={TaskLogo} alt="Logo Icon" className="w-7 h-7 sm:w-8 sm:h-8" />
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                        Task Tracker
                    </h1>
                </div>
                <button
                    className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-2xl active:bg-blue-800 focus:bg-blue-500 text-xs sm:text-sm"
                    onClick={onAddClick}
                >
                    Add Task
                </button>
            </div>
            <div className="flex flex-wrap mx-2 gap-2 mb-4">
                <button
                    className="bg-blue-200 py-1 px-2 font-light rounded-3xl active:bg-blue-400 focus:bg-blue-500 text-xs"
                    onClick={() => onFilterChange('all')}
                >
                    All
                </button>
                <button
                    className="bg-green-200 py-1 px-2 font-light rounded-3xl active:bg-green-400 focus:bg-green-500 text-xs"
                    onClick={() => onFilterChange('work')}
                >
                    Work
                </button>
                <button
                    className="bg-yellow-200 py-1 px-2 font-light rounded-3xl active:bg-yellow-400 focus:bg-yellow-500 text-xs"
                    onClick={() => onFilterChange('personal')}
                >
                    Personal
                </button>
                <button
                    className="bg-purple-200 py-1 px-2 font-light rounded-3xl active:bg-purple-400 focus:bg-purple-500 text-xs"
                    onClick={() => onFilterChange('others')}
                >
                    Others
                </button>
            </div>
        </>
    );
};

export default Header;