import React from 'react'

const AddTask = ({onClose}) => {
    const handleSubmit = (event)  =>{
        event.preventDefault();
        // add task submisson logic here (e.g collect form data)
        console.log('Form submitted')
        onClose();
    }
    return (
        <div className = "fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className = "bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className = "text-lg font-semibold mb-4 text-gray-800">Add New Task</h2>
                <form className = "space-y-4" onSubmit = {event.preventDefault}>
                    <div>
                        <label className = "block text-sm font-medium text-grey-700 px-4 py-2" >Task Title</label>
                        <input
                            type = "text" placeholder = "Enter Task Title" required
                            className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700 px-4 py-2">Category</label>
                        <select className = "w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500" required>
                            <option value = "">Select Category</option>
                            <option value = "">Work</option>
                            <option value = "">Personal</option>
                            <option value = "">Others</option>
                        </select>
                    </div>

                    <div className = "flex flex-row items-end justify-end gap-2 pt-2">
                        <button type = "button" className = "text-white hover:underline bg-red-400 py-2 px-3 rounded-r-xl" onClick = {onClose}>Cancel</button>
                        <button type = "submit" className = "text-white hover:underline bg-green-400 py-2 px-3 rounded-s-xl" onClick = "">Add Task</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
export default AddTask
