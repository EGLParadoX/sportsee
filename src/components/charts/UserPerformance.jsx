import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import ApiServices from '../../utils/apiService';
import MockService from '../../utils/mockService';

const UserPerformance = ({ userId, dataSource }) => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        const performance =
          dataSource === 'api'
            ? await ApiServices.getUserPerformance(userId)
            : await MockService.getUserPerformance(userId);
    
        const performanceData = dataSource === 'api' ? performance.data : performance;
    
        setPerformanceData(performanceData);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };
    

    fetchUserPerformance();
  }, [userId, dataSource]);

  if (!performanceData) {
    return <div>Loading...</div>;
  }

  const kindMapping = performanceData.kind;
  const performanceValues = performanceData.data.map((entry) => ({
    subject: kindMapping[entry.kind],
    A: entry.value,
  }));

  const translateKind = (value) => {
    const translations = {
      cardio: 'Cardio',
      energy: 'Énergie',
      endurance: 'Endurance',
      strength: 'Force',
      speed: 'Vitesse',
      intensity: 'Intensité',
    };

    return translations[value] || value;
  };

  return (
    <div>
      <RadarChart className='responsive' cx={150} cy={150} outerRadius={87} width={300} height={300} data={performanceValues} style={{ background: "#282D30", borderRadius: "7px" }}>
        <PolarGrid radialLines={false} polarRadius={[0, 10, 27, 49, 72, 95]}/>
        <PolarAngleAxis dataKey="subject" fontSize={14} tickFormatter={translateKind} tick={{ fill: 'white' }} />
        <PolarRadiusAxis axisLine={false} tick={false} />
        <Radar name="Performance" dataKey="A" stroke="red" fill="red" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
  
};

UserPerformance.propTypes = {
  userId: PropTypes.number.isRequired,
  dataSource: PropTypes.string,
};

export default UserPerformance;

