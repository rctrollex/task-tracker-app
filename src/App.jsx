import React, { useState } from 'react';
import Header from "./components/Header.jsx";
import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all') //New State for filter

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                <Header
                    onAddClick={() => setShowModal(true)}
                    onFilterChange={setFilterCategory} //pass filter callback
                />
                <TaskList
                    refetchTrigger={refetchTrigger}
                    filterCategory={filterCategory}
                />
            </div>
            {showModal && <AddTask onClose={() => {
                setShowModal(false);
                setRefetchTrigger(prev => !prev);
            }} />}
        </div>
    );
};

export default App;