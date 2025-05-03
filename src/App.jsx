import React, {useState} from 'react'
import Header from "./components/Header.jsx";
import AddTask from "./components/AddTask.jsx";

const App = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className = "bg-gray-100 min-h-screen p-4 sm:p-6">
            <div className = "max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                <Header onAddClick={() => setShowModal(true)}/>

            </div>
            {showModal && <AddTask onClose = {()=> setShowModal(false)}/>}
        </div>

    )
}
export default App
