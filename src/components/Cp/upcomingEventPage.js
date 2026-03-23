import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import moment from "moment";
import Calendar from "react-calendar";
import "./Calendar.css";
import _ from "lodash";
import Clocks from "../../common/clocks";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    margin: "2% 1%",
    justifyContent: "space-around",
  },
  itemContainer: {
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  cardContainer: {
    margin: "30px 0px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
  },
}));

const UpcomingEventPage = (props) => {
  const classes = useStyles();
  const [currentTimezone, setCurrentTimezone] = useState(moment.tz.guess());
  const [selDate, setSelDate] = useState(new Date());
  const currentTime = moment.tz(new Date(), currentTimezone);

  const { formatData } = useUpcomingEvents();
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      for (let i = 0; i < formatData.length; i++) {
        const data = formatData[i];
        if (
          date.getMonth() === data.dateObj.getMonth() &&
          date.getDate() === data.dateObj.getDate()
        ) {
          return data.type;
        }
      }
    }
  };

  const tileContent = ({ date, view }) => {
    let count = 0;
    if (view === "month") {
      for (let i = 0; i < formatData.length; i++) {
        const data = formatData[i];
        if (
          date.getMonth() === data.dateObj.getMonth() &&
          date.getDate() === data.dateObj.getDate()
        ) {
          count += 1;
        }
      }
    }
    if (count > 1) {
      return (
        <Grid
          style={{
            position: "absolute",
            top: 2,
            right: 3,
            fontStyle: "italic",
            fontSize: 12,
          }}
        >
          {count}
        </Grid>
      );
    }
  };

  const onChange = (e) => {
    setSelDate(e);
  };

  const getSelectedDateEvents = () => {
    let count = 0;
    let events = [];
    for (let i = 0; i < formatData.length; i++) {
      const data = formatData[i];
      if (
        selDate.getMonth() === data.dateObj.getMonth() &&
        selDate.getDate() === data.dateObj.getDate()
      ) {
        count += 1;
        events.push({
          name: data.name,
          type: data.type,
          dateObj: data.dateObj,
        });
      }
    }
    return { count, events };
  };

  const getPlatformColor = (type) => {
    if (type === "LEETCODE") {
      return "#fcba03";
    } else if (type === "CODEFORCES") {
      return "#B22222";
    } else if ("ATCODER") {
      return "#008080";
    } else {
      return "white";
    }
  };

  const renderCalendarContainer = () => {
    return (
      <Grid item className={classes.itemContainer} style={{ paddingTop: 20 }}>
        <Calendar
          onChange={onChange}
          value={currentTime.toDate()}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </Grid>
    );
  };

  return (
    <Grid item container className={classes.container}>
      <Card className={classes.cardContainer}>
        <CardContent>
          <Grid container item>
            <Grid container item>
              <Grid item container alignItems="center">
                <Typography variant="h6" style={{ width: "30%" }}>
                  {`Next Event:`}
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    width: "70%",
                    color: getPlatformColor(
                      formatData[0] && formatData[0].type
                    ),
                  }}
                >
                  {`${_.isUndefined(formatData[0]) ? "" : formatData[0].name}`}
                </Typography>
              </Grid>

              <Grid item container alignItems="center">
                <Typography variant="h6" style={{ width: "30%" }}>
                  {`Start Time:`}
                </Typography>
                <Typography variant="h6" style={{ width: "70%" }}>
                  {`${
                    _.isUndefined(formatData[0])
                      ? ""
                      : formatData[0].dateObj.toDateString()
                  }`}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              style={{
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!_.isEmpty(formatData) && !_.isUndefined(formatData[0]) && (
                <Clocks
                  startDate={currentTime.toDate()}
                  endDate={formatData[0].dateObj}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className={classes.cardContainer}>
        <CardContent>
          <Grid item container alignItems="center">
            <Typography variant="h6" style={{ width: "30%" }}>
              {`Selected Date:`}
            </Typography>
            <Typography variant="h6" style={{ width: "70%" }}>
              {`${_.isUndefined(selDate) ? "" : selDate.toDateString()}`}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: 20 }}
          >
            <Typography variant="h5" style={{ width: "30%" }}>
              {`Events:`}
            </Typography>
            <Grid item variant="h6" style={{ width: "70%" }}>
              {getSelectedDateEvents().events.map((event, idx) => {
                return (
                  <Typography
                    key={idx}
                    variant="h5"
                    style={{ color: getPlatformColor(event.type) }}
                  >
                    {`${event.name} [${event.dateObj.toLocaleTimeString(
                      "en-US"
                    )}]`}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {renderCalendarContainer()}
    </Grid>
  );
};

export default UpcomingEventPage;
