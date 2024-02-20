import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDrumstickBite, faAppleAlt, faHamburger } from '@fortawesome/free-solid-svg-icons';
import ApiServices from '../../utils/apiService';
import MockService from '../../utils/mockService';

const UserMacronutrients = ({ userId, dataSource }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userMacronutrientsData =
          dataSource === 'api'
            ? await ApiServices.getUserData(userId)
            : await MockService.getUserData(userId);

        setUserData(userMacronutrientsData);
      } catch (error) {
        console.error('Error fetching user macronutrients data:', error);
      }
    };

    fetchUserData();
  }, [userId, dataSource]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const keyData = userData.data ? userData.data.keyData : userData.keyData;

  if (!keyData) {
    return <div>Data format is incorrect.</div>;
  }

  const { proteinCount, carbohydrateCount, lipidCount, calorieCount } = keyData;

  return (
    <div className='allMacroNutrients'>
      <MacronutrientBlock
        icon={faFire}
        name="Calories"
        value={calorieCount}
        unit="kcal"
        bgColor="#FF00001A"
        iconColor="#FF0000"
      />
      <MacronutrientBlock
        icon={faDrumstickBite}
        name="Protéines"
        value={proteinCount}
        unit="g"
        bgColor="#3F7CFF1A"
        iconColor="#4AB8FF"
      />
      <MacronutrientBlock
        icon={faAppleAlt}
        name="Glucides"
        value={carbohydrateCount}
        unit="g"
        bgColor="#F9CE231A"
        iconColor="#FDCC0C"
      />
      <MacronutrientBlock
        icon={faHamburger}
        name="Lipides"
        value={lipidCount}
        unit="g"
        bgColor="#FD51811A"
        iconColor="#FD5181"
      />
    </div>
  );
};

const MacronutrientBlock = ({ icon, name, value, unit, bgColor, iconColor }) => (
  <div className='macronutrients-info'>
    <FontAwesomeIcon icon={icon} className="icon" style={{ backgroundColor: bgColor, color: iconColor }} />
    <div className='value-name'>
      <div className='value'>{`${value}${unit}`}</div>
      <div className='name'>{`${name}`}</div>
    </div>
  </div>
);

UserMacronutrients.propTypes = {
  userId: PropTypes.number.isRequired,
  dataSource: PropTypes.string,
};

MacronutrientBlock.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default UserMacronutrients;
