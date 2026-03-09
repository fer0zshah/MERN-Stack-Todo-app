import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import "./App.css"
import Todo from './pages/Todo';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* This stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* We will add the Todo route next! */}
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
};

export default App;