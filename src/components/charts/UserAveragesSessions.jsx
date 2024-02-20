import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import ApiServices from '../../utils/apiService';
import MockService from '../../utils/mockService';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div style={{ backgroundColor: 'white', padding: '5px', fontSize: "14px" }}>
        {`${value} min`}
      </div>
    );
  }

  return null;
};

const UserAverageSessions = ({ userId, dataSource }) => {
  const [averageSessionsData, setAverageSessionsData] = useState(null);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const averageSessions =
          dataSource === 'api'
            ? await ApiServices.getUserAverageSessions(userId)
            : await MockService.getUserAverageSessions(userId);
    
        const averageSessionsData = dataSource === 'api' ? averageSessions.data : averageSessions;
    
    
        setAverageSessionsData(averageSessionsData);
      } catch (error) {
        console.error('Error fetching user average sessions:', error);
      }
    };
    
    

    fetchUserActivity();
  }, [userId, dataSource]);

  if (!averageSessionsData) {
    return <div>Loading...</div>;
  }

  const daysMapping = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const customTickFormatter = (value) => daysMapping[value - 1];

  return (
    <div>
      <LineChart
      className='responsive'
        width={300}
        height={300}
        data={averageSessionsData.sessions}
        margin={{ top: 30, right: 50, left: 0, bottom: 60 }} 
        style={{ background: "#FF0000", borderRadius: "7px" }}
        legendType="none"
      >
        <text x={10} y={30} fontSize={20} fill='rgba(255, 255, 255, 0.6)'>
          <tspan x={30} dy="1.2em">Durée moyenne des</tspan>
          <tspan x={30} dy="1.2em">sessions</tspan>
        </text>
        <defs>
          <linearGradient id="lineColor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.5)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" tickFormatter={customTickFormatter} tickLine={false} axisLine={false} tick={{ fill: '#FFFFFF', opacity: '0.5' }} />
        <YAxis
          tick={false}
          axisLine={false}
          domain={[20, 100]} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="sessionLength" name="" stroke="url(#lineColor)" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
      </LineChart>
    </div>
  );
};

UserAverageSessions.propTypes = {
  userId: PropTypes.number.isRequired,
  dataSource: PropTypes.string,
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      })
    ),
  };


export default UserAverageSessions;
