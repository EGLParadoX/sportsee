import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || "Oups ! Cette page n'existe pas !"; 

  return (
    <div className="error-page">
        <img src={logo} alt="Logo" />
        <h1>{errorMessage}</h1>
        <Link to="/">Retourner à la page de connexion</Link>
    </div>
  );
};

export default ErrorPage;
