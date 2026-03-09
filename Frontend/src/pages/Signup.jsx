import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_BACKEND_URL

const Signup = () => {
    const [Inputs, setInputs] = useState({ email: "", userName: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            // Talking to your backend /api/v1/register route
            const response = await axios.post(`${API_URL}/api/v1/register`, Inputs);
            toast.success(response.data.message);
            setInputs({ email: "", userName: "", password: "" });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer />
            <form onSubmit={submit}>
                <input type="email" name="email" placeholder="Email" onChange={change} value={Inputs.email} required />
                <input type="text" name="userName" placeholder="Username" onChange={change} value={Inputs.userName} required />
                <input type="password" name="password" placeholder="Password" onChange={change} value={Inputs.password} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;