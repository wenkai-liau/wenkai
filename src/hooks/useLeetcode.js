import axios from 'axios';
import _ from 'lodash';
import { useState, useEffect } from 'react';

const useLeetcode = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    axios.get(`https://alfa-leetcode-api.onrender.com/Lwenkai/solved`)
      .then(res => {
        // Map from alfa-leetcode-api format to expected format
        const d = res.data;
        setData({
          totalSolved: d.solvedProblem,
          totalQuestions: d.totalProblem || 0,
          easySolved: d.easySolved,
          totalEasy: d.totalEasy || 0,
          mediumSolved: d.mediumSolved,
          totalMedium: d.totalMedium || 0,
          hardSolved: d.hardSolved,
          totalHard: d.totalHard || 0,
          acceptanceRate: d.totalSolved && d.totalSubmissions
            ? Math.round((d.totalSolved / d.totalSubmissions) * 100)
            : 0,
          ranking: d.ranking || 0,
          contributionPoints: d.contributionPoints || 0,
        });
      })
      .catch(() => {
        // API failed, set empty data
        setData({});
      });
  }, []);

  return data;
};

export default useLeetcode;