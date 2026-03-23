import { makeStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  App: {
    display: "flex",
    justifyContent: "space-around",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  //   time: {
  //     fontSize: "32px",
  //   },
}));

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const Clocks = (props) => {
  const classes = useStyles();

  const { startDate, endDate } = props;
  const { height, width } = useWindowDimensions();
  const isPhoneScreen = width < 700;
  const timerProps = {
    isPlaying: true,
    size: isPhoneScreen ? 80 : 120,
    strokeWidth: 6,
  };

  if (_.isUndefined(startDate) || _.isUndefined(endDate)) {
    return <></>;
  }

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div style={{ fontSize: isPhoneScreen ? 20 : 42 }}>{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };
  const startTime = startDate.getTime() / 1000; // use UNIX timestamp in seconds
  const endTime = endDate.getTime() / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className={classes.App}>
      <CountdownCircleTimer
        {...timerProps}
        colors="#7E2E84"
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#D14081"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#EF798A"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#218380"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default Clocks;
