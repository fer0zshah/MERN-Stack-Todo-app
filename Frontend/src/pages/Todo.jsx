import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "../App.css"; 
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_BACKEND_URL

const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: "", title: "", body: "" });
    const navigate = useNavigate();

    const id = sessionStorage.getItem("id");
    const email = sessionStorage.getItem("email"); 

    const show = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const fetchTasks = async () => {
        if (id) {
            try {
                const response = await axios.get(`${API_URL}/api/v2/getTasks/${id}`);
                setArray(response.data.list || []);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (!id) {
            toast.error("Please Sign In First");
            navigate("/signin");
        } else {
            fetchTasks();
        }
    }, [id, navigate]);

    const submit = async () => {
        if (id && email) {
            try {
                await axios.post(`${API_URL}/api/v2/addTask`, { 
                    title: Inputs.title, 
                    body: Inputs.body, 
                    email: email 
                });
                setInputs({ title: "", body: "" });
                toast.success("Task Added");
                fetchTasks(); 
            } catch (error) {
                toast.error("Failed to add task");
            }
        }
    };

    const del = async (Cardid) => {
        try {
            await axios.delete(`${API_URL}/api/v2/deleteTask/${Cardid}`, {
                data: { email: email }
            });
            toast.success("Task Deleted");
            fetchTasks(); 
        } catch (error) {
            toast.error("Internal Server Error");
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_URL}/api/v2/updateTask/${currentTask.id}`, {
                title: currentTask.title,
                body: currentTask.body
            });
            toast.success("Task Updated");
            setUpdateOpen(false);
            fetchTasks(); 
        } catch (error) {
            toast.error("Failed to update task");
        }
    };

    return (
        <div className="todo">
            <ToastContainer />
            <div className="todo-main container">
                <input type="text" placeholder="TITLE" name="title" value={Inputs.title} onChange={show} />
                <textarea placeholder="BODY" name="body" value={Inputs.body} onChange={show} />
                <button onClick={submit}>Add</button>
            </div>
            
            <div className="todo-body w-100 mt-4">
                <div className="container-fluid">
                    {/* Changed: Added row with spacing */}
                    <div className="row justify-content-center g-4">
                        {Array && Array.map((item, index) => (
                            /* Changed: Wrapped card in a column (4 cards per row on large screens) */
                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                <div className="task-card h-100">
                                    <div className="card-content">
                                        <h5>{item.title}</h5>
                                        <p>{item.body}</p> 
                                    </div>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <button 
                                            className="edit-btn btn btn-success" 
                                            onClick={() => {
                                                setCurrentTask({ id: item._id, title: item.title, body: item.body });
                                                setUpdateOpen(true);
                                            }}>
                                            Edit
                                        </button>
                                        <button className="del-btn btn btn-danger" onClick={() => del(item._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {updateOpen && (
                <div className="update-overlay">
                    <div className="update-modal">
                        <h3>Update Task</h3>
                        <input 
                            type="text" 
                            value={currentTask.title} 
                            onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} 
                        />
                        <textarea 
                            value={currentTask.body} 
                            onChange={(e) => setCurrentTask({...currentTask, body: e.target.value})} 
                        />
                        <div className="d-flex justify-content-between mt-2">
                            <button className="update-btn" onClick={handleUpdate}>Save</button>
                            <button className="del-btn" onClick={() => setUpdateOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;