import "./App.css";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("token") != null || false;
  if (!isLoggedIn && auth) {
    return <Navigate to="/sign_in" replace />;
  } else if (
    isLoggedIn &&
    ["/sign_in", "/sign_up"].includes(window.location.pathname)
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remplacez l'URL par votre URL backend
        const response = await axios.get('http://13.49.21.187:4000/home');
        console.log(response)
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []); // Assurez-vous de mettre les dépendances correctes ici

  return (
    <div className="w-screen flex justify-center items-center">
      <Routes>
        <Route
          path="sign_in"
          element={
            <ProtectedRoute>
              <Form isSignInPage={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="sign_up"
          element={
            <ProtectedRoute>
              <Form isSignInPage={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute auth={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
