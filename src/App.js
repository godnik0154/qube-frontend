import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import Onboarding from './components/onboarding';
import Dashboard from './components/dashboard'

function App() {

  const email = localStorage.getItem('email');

  const [validUser, setValidUser] = React.useState(false);

  React.useEffect(()=>{
    setValidUser(email !== null);
  },[email])

  return (
    <Routes>
      <Route path="/onboarding" exact element={<Onboarding />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
