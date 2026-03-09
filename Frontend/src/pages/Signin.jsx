import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const API_URL = import.meta.env.VITE_BACKEND_URL

const Signin = () => {
    const [Inputs, setInputs] = useState({ email: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

const submit = async (e) => {
    e.preventDefault();
    try {
       // NEW DYNAMIC VERSION
        const response = await axios.post(`${API_URL}/api/v1/signin`, Inputs);
        
        sessionStorage.setItem("id", response.data.others._id);
        sessionStorage.setItem("email", response.data.others.email); 
        // ADD THIS LINE
        sessionStorage.setItem("username", response.data.others.userName); 

        toast.success("Login Successful");
        window.location.href = "/todo"; 
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

    return (
        <div className="signup-container">
            <ToastContainer />
            <form onSubmit={submit}>
                <h2>Sign In</h2>
                <input type="email" name="email" placeholder="Email" onChange={change} value={Inputs.email} required />
                <input type="password" name="password" placeholder="Password" onChange={change} value={Inputs.password} required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Signin;