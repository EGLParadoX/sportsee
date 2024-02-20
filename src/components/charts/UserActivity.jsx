// UserActivity.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiServices from '../../utils/apiService';
import MockService from '../../utils/mockService';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const kilogram = payload.find((entry) => entry.dataKey === 'kilogram');
    const calories = payload.find((entry) => entry.dataKey === 'calories');

    return (
      <div style={{ color: 'white', backgroundColor: 'red', padding: '20px 10px', textAlign: 'center', fontSize: '14px' }}>
        {<p style={{ paddingBottom: '35px' }}>{kilogram.value}kg</p>}
        {<p>{calories.value}kcal</p>}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};

const UserActivity = ({ userId, dataSource }) => {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const activity =
          dataSource === 'api'
            ? await ApiServices.getUserActivity(userId)
            : await MockService.getUserActivity(userId);
    
    
        const activityData = dataSource === 'api' ? activity.data : activity;
    
        setActivityData(activityData);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };
    

    fetchUserActivity();
  }, [userId, dataSource]);

  if (!activityData) {
    return <div>Loading...</div>;
  }

  const baseMinWeight = Math.min(...activityData.sessions.map((entry) => entry.kilogram));
  const minWeight = baseMinWeight - 1;

  const maxWeight = minWeight + 2;
  const yAxisTicks = [minWeight, minWeight + 1, maxWeight];

  return (
    <div>
      {console.log('Rendering UserActivity')}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={activityData.sessions}
          margin={{ top: 40, right: 30, left: 0, bottom: 30 }}
          style={{ background: '#FBFBFB', paddingTop: '30px', marginTop: '30px' }}
          barGap={10}
        >
          <text x={50} y={20} fontSize={18} fontWeight="500">
            Activité quotidienne
          </text>
          <XAxis tickLine={false} tickMargin={20} />
          <YAxis
            dataKey="kilogram"
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            domain={[minWeight, maxWeight]}
            ticks={yAxisTicks}
            tickMargin={30}
          />
          <YAxis dataKey="calories" yAxisId="left" orientation="left" axisLine={false} tick={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
            itemStyle={{ color: '#282D30' }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconSize={10}
            iconType="circle"
            formatter={(value, entry, index) => {
              const textColor = index === 1 ? 'red' : '#282D30';

              return (
                <span style={{ color: textColor }}>
                  {value}
                </span>
              );
            }}
          />
          <Bar dataKey="kilogram" name="Poids (kg)" fill="#282D30" radius={[10, 10, 0, 0]} barSize={10} yAxisId="right" />
          <Bar dataKey="calories" name="Calories brûlées (kcal)" fill="red" radius={[10, 10, 0, 0]} barSize={10} yAxisId="left" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

UserActivity.propTypes = {
  userId: PropTypes.number.isRequired,
  dataSource: PropTypes.string,
};



export default UserActivity;
