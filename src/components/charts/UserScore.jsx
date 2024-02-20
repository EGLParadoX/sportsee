import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import ApiServices from '../../utils/apiService';
import MockService from '../../utils/mockService';

const UserScore = ({ userId, dataSource }) => {
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const score =
          dataSource === 'api'
            ? await ApiServices.getUserScore(userId)
            : await MockService.getUserScore(userId);
    
        const scoreData = dataSource === 'api' ? score.data : score;
    
        setScoreData(scoreData);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };
    

    fetchUserScore();
  }, [userId, dataSource]);

  if (!scoreData) {
    return <div>Loading...</div>;
  }

  const scorePercentage = Math.round(scoreData.score * 100);

  const barFill = [
    { value: scorePercentage, fill: 'red' },
    { value: 100 - scorePercentage, fill: 'white' },
  ];

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <RadialBarChart
      className='responsive'  
        width={300}
        height={300}
        cx={150}
        cy={150}
        innerRadius={200}
        outerRadius={0}
        barSize={15}
        data={barFill}
        style={{ background: "#FBFBFB" }}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
          cornerRadius={10}
          startAngle={90}
        />
        <Legend iconSize={0} />
      </RadialBarChart>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: "30px" }}>{scorePercentage}%</div>
        <div style={{ fontSize: "20px", width: '100px' }}>de votre objectif</div>
      </div>
    </div>
  );
};

UserScore.propTypes = {
  userId: PropTypes.number.isRequired,
  dataSource: PropTypes.string,
};

export default UserScore;
