import axios from 'axios';
import _ from 'lodash';
import { useState, useEffect } from 'react';

const useLeetcode = () => {

const [data, setData] = useState(undefined);


useEffect(() => {
    axios.get(`https://leetcode-stats-api.herokuapp.com/Lwenkai`)
      .then(res => {
        setData(res.data);
      })
  }, []);

  return data
}

export default useLeetcode