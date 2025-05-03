import React from 'react'
import Header from "./components/Header.jsx";

const App = () => {
    return (
        <>
            <div className = "bg-gray-100 min-h-screen p-4 sm:p-6">
                <div className = "max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                    <Header/>
                </div>
            </div>
        </>

    )
}
export default App
