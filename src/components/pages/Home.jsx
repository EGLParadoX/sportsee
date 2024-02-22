import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import UserActivity from "../charts/UserActivity";
import UserAverageSessions from "../charts/UserAveragesSessions";
import UserPerformance from "../charts/UserPerformance";
import UserScore from "../charts/UserScore";
import UserMacronutrients from "../charts/UserMacronutrients";
import PropTypes from "prop-types";
import DataService from "../../utils/dataService";

const Home = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userIdNumber = parseInt(userId, 10);

  const searchParams = new URLSearchParams(location.search);
  const dataSourceFromURL = searchParams.get("source") || "api";

  const [dataSource] = useState(dataSourceFromURL);

  useEffect(() => {
    DataService.init(dataSource);
    const fetchData = async () => {
      try {
        const data = await DataService.getUserData(userId);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate('/error', { state: { errorMessage: "Oups, une erreur est survenue lors de la récupération des données" } });
 
      }
    };

    fetchData();
  }, [userId, dataSource, location.search, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userFirstName = userData?.userInfos?.firstName || "";

  return (
    <div className="user-infos">
      <div className="user-infos-title">
        {userFirstName ? (
          <>
            <h1>
              Bonjour <span>{userFirstName}</span>
            </h1>
            {console.log("User Data:", userData)}
          </>
        ) : (
          <>
            <p>Informations utilisateur non disponibles</p>
          </>
        )}
      </div>

      <p className="user-infos-subtitle">
        Félicitations ! Vous avez explosé vos objectifs hier 👏
      </p>

      <div className="main-content">
        <div className="left-graphs">
          <UserActivity userId={userIdNumber} dataSource={dataSource} />
          <div className="left-graphs-under">
            <UserAverageSessions
              userId={userIdNumber}
              dataSource={dataSource}
            />
            <UserPerformance userId={userIdNumber} dataSource={dataSource} />
            <UserScore userId={userIdNumber} dataSource={dataSource} />
          </div>
        </div>
        <div className="right-info">
          <UserMacronutrients userId={userIdNumber} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  location: PropTypes.object,
};

export default Home;
