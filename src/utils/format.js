export const formatScoreData = (userData) => {
  if (!userData) {
    return null;
  }

  if (userData.data && userData.data.todayScore) {
    userData.data.score = userData.data.todayScore;
    delete userData.data.todayScore;
  } else if (userData.todayScore !== undefined) {
    userData.score = userData.todayScore;
    delete userData.todayScore;
  }

  return userData;
};
