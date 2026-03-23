import axios from "axios";
import _ from "lodash";
import { useState, useEffect } from "react";

const useUpcomingEvents = () => {
  const [data, setData] = useState([]);

  // Primary: clist.by API (no auth needed for public data)
  // Fallback: kontests.net
  const kontestsApis = [
    `https://kontests.net/api/v1/codeforces`,
    `https://kontests.net/api/v1/at_coder`,
    `https://kontests.net/api/v1/leet_code`,
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const requests = kontestsApis.map((api) =>
          axios.get(api, { timeout: 5000 }).catch(() => ({ data: [] }))
        );
        const responses = await Promise.all(requests);
        const allData = responses.flatMap((r) => r.data || []);

        const formatData = _.map(allData, (item) => ({
          ...item,
          dateObj: new Date(item.start_time),
          type: item.url
            ? item.url.includes("leetcode")
              ? "LEETCODE"
              : item.url.includes("atcoder")
              ? "ATCODER"
              : "CODEFORCES"
            : "CODEFORCES",
        }));

        const sortedData = formatData
          .sort((a, b) => a.dateObj - b.dateObj)
          .filter((item) => item.dateObj > new Date());

        setData(sortedData);
      } catch (err) {
        // Silently fail - events will just be empty
        setData([]);
      }
    };

    fetchEvents();
  }, []);

  return { formatData: data };
};

export default useUpcomingEvents;
