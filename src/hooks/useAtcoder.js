import axios from "axios";
import _ from "lodash";
import { useState, useEffect } from "react";

const useAtcoder = () => {
  const [data, setData] = useState(undefined);
  const pastDate = new Date();

  const acceptedCountApi = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=kaicoder0`;
  const ratedPointApi = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/rated_point_sum_rank?user=kaicoder0`;
  const languagesApi = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/language_rank?user=kaicoder0`;
  const submissionsApi = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=kaicoder0&from_second=${pastDate.getTime()}`;


//   useEffect(() => {
//     // // accepted count
//     // axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=kaicoder0`)
//     //   .then(res => {
//     //     setData(res.data);
//     //   })

//     const uri = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=kaicoder0`
//     // accepted count
//     axios.get(`https://cors-anywhere.herokuapp.com/${uri}`)
//       .then(res => {
//         // setData(res.data);
//         console.log(res)
//       })

//     // const requestOne = axios.get(acceptedCountApi);
//     // const requestTwo = axios.get(ratedPointApi);
//     // const requestThree = axios.get(languagesApi);
//     // const requestFour = axios.get(submissionsApi);

//     // axios
//     //   .all([requestOne, requestTwo, requestThree, requestFour])
//     //   .then(
//     //     axios.spread((...responses) => {
//     //       const responseOne = responses[0];
//     //       const responseTwo = responses[1];
//     //       const responesThree = responses[2];
//     //       const responesFour = responses[3];
//     //       // use/access the results
//     //     })
//     //   )
//     //   .catch((errors) => {
//     //   });
//   }, []);

  return data;
};

export default useAtcoder;
