import React, { useState } from 'react';
import Header from "./components/Header.jsx";
import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    return (
        <div className="bg-gray-100 min-h-screen p-3 sm:p-4 md:p-6">
            <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-md p-4 sm:p-6">
                <Header
                    onAddClick={() => setShowModal(true)}
                    onFilterChange={setFilterCategory}
                />
                <TaskList
                    refetchTrigger={refetchTrigger}
                    filterCategory={filterCategory}
                />
            </div>
            {showModal && (
                <AddTask
                    onClose={() => {
                        setShowModal(false);
                        setRefetchTrigger(prev => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default App;