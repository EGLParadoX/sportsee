// Connexion component
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Connexion({ handleDataSelection }) {
  const [selectedOption, setSelectedOption] = useState("api");
  const navigate = useNavigate();
  const defaultUserId = 12; 

  const handleToggleData = () => {
    const newOption = selectedOption === "api" ? "mock" : "api";
    setSelectedOption(newOption);
  };

  const handleValidation = () => {
    handleDataSelection(selectedOption, defaultUserId); 
    navigate(`/home/${defaultUserId}?source=${selectedOption}`); 
  };

  return (
    <div className="connexion-page">
        <div className="connexion-page-content">
      <h1 className="connexion-page--content-title">Sélectionnez la source de données :</h1>
      <div className="labels"><label>
        <input
          type="radio"
          value="api"
          checked={selectedOption === "api"}
          onChange={handleToggleData}
        />
        Données de l API
      </label>
      <label>
        <input
          type="radio"
          value="mock"
          checked={selectedOption === "mock"}
          onChange={handleToggleData}
        />
        Données Mock
      </label></div>
      
      <button onClick={handleValidation}>Valider</button>
    </div>
    </div>
    
  );
}

Connexion.propTypes = {
  handleDataSelection: PropTypes.func.isRequired,
};

export default Connexion;
