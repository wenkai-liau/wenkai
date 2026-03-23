import axios from "axios";
import _ from "lodash";
import { useState, useEffect } from "react";
import useDidMountEffect from "./useDidMountEffect";

const useCodeforces = () => {
  const [ratingData, setRatingData] = useState(undefined);
  const [submissionsData, setSubmissionsData] = useState(undefined);
  const [allContest, setAllContest] = useState([]);

  const [contestIds, setContestIds] = useState([]);

  useEffect(() => {
    axios
      .get(`https://codeforces.com/api/contest.list?gym=false`)
      .then((res) => {
        const data = res.data.result;
        const nameDate = {};
        _.forEach(data, (x) => {
          nameDate[x.name] = { ...x };
        });
        setAllContest(nameDate);
      });
  }, []);

  useDidMountEffect(() => {
    axios
      .get(`https://codeforces.com/api/user.rating?handle=wKai000`)
      .then((res) => {
        setRatingData(
          _.map(res.data.result, (rs) => {
            return {
              ...rs,
              startDate: allContest[rs.contestName].startTimeSeconds,
            };
          })
        );
        setContestIds(res.data.result.map((contest) => contest.contestId));
      });

    axios
      .get(`https://codeforces.com/api/user.status?handle=wKai000`)
      .then((res) => {
        setSubmissionsData(res.data.result);
      });
  }, [allContest]);

  const getProblemsSolved = () => {
    // number of questions solved per contest
    const idSolved = {};

    _.forEach(contestIds, (id) => (idSolved[id] = 0));

    const categories = {};
    const submissionStatus = {};

    if (_.isUndefined(submissionsData) || _.isEmpty(submissionsData)) {
      return { idSolved, categories, submissionStatus };
    }

    _.forEach(submissionsData, (data) => {
      const passed = data.verdict === "OK";
      submissionStatus[data.verdict] =
        _.defaultTo(submissionStatus[data.verdict], 0) + 1;

      if (!passed) {
        return;
      }

      const cId = data.problem.contestId;
      const contestParticipant = data.author.participantType === "CONTESTANT";
      if (contestParticipant && contestIds.includes(cId)) {
        idSolved[cId] += 1;
      }

      _.forEach(
        data.problem.tags,
        (tag) => (categories[tag] = _.defaultTo(categories[tag], 0) + 1)
      );
    });
    return { idSolved, categories, submissionStatus };
  };

  const { idSolved, categories, submissionStatus } = getProblemsSolved();

  return {
    ratingData,
    submissionsData,
    idSolved,
    categories,
    submissionStatus,
  };
};

export default useCodeforces;
