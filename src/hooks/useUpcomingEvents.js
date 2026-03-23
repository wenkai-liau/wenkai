import axios from "axios";
import _ from "lodash";
import { useState, useEffect } from "react";

const useUpcomingEvents = () => {
  const [data, setData] = useState([]);

  const one = `https://kontests.net/api/v1/codeforces`;
  const two = `https://kontests.net/api/v1/at_coder`;
  const three = `https://kontests.net/api/v1/leet_code`;

  useEffect(() => {
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);

    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0].data
      const responseTwo = responses[1].data
      const responseThree = responses[2].data

      const allData = [...responseOne, ...responseTwo, ...responseThree]
      const formatData = _.map(allData, (data) => {
        return {
          ...data,
          dateObj: new Date(data.start_time),
          type: data.url.includes("leetcode")
            ? "LEETCODE"
            : data.url.includes("atcoder")
            ? "ATCODER"
            : "CODEFORCES",
        };
      });
      const sortedData = formatData
      .sort((a, b) => a.dateObj - b.dateObj)
      .filter((data) => data.dateObj > new Date());
      setData(sortedData);

    })).catch(errors => {
      // react on errors.
    })
  }, []);
  return { formatData: data };
};

export default useUpcomingEvents;
