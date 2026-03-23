import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import moment from "moment-timezone";
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
    flexWrap: "wrap",
  },
  itemContainer: {
    padding: 10,
    width: "100%",
  },
  cardContainer: {
    margin: "30px 0px",
    backgroundColor: "#111827",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
  },
  noEventsText: {
    color: "#94a3b8",
    textAlign: "center",
    padding: "40px 20px",
    fontSize: 16,
  },
}));

const UpcomingEventPage = (props) => {
  const classes = useStyles();
  const [currentTimezone] = useState(() => {
    try {
      return moment.tz.guess();
    } catch {
      return "UTC";
    }
  });
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
      return "#fbbf24";
    } else if (type === "CODEFORCES") {
      return "#f87171";
    } else if (type === "ATCODER") {
      return "#34d399";
    } else {
      return "#e2e8f0";
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

  const hasEvents = !_.isEmpty(formatData) && !_.isUndefined(formatData[0]);

  return (
    <Grid item container className={classes.container}>
      <Card className={classes.cardContainer}>
        <CardContent>
          <Grid container item>
            <Grid container item>
              <Grid item container alignItems="center">
                <Typography variant="h6" style={{ width: "30%", color: "#e2e8f0" }}>
                  {`Next Event:`}
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    width: "70%",
                    color: hasEvents
                      ? getPlatformColor(formatData[0].type)
                      : "#94a3b8",
                  }}
                >
                  {hasEvents ? formatData[0].name : "No upcoming events"}
                </Typography>
              </Grid>

              <Grid item container alignItems="center">
                <Typography variant="h6" style={{ width: "30%", color: "#e2e8f0" }}>
                  {`Start Time:`}
                </Typography>
                <Typography variant="h6" style={{ width: "70%", color: "#94a3b8" }}>
                  {hasEvents ? formatData[0].dateObj.toDateString() : "—"}
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
              {hasEvents && (
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
            <Typography variant="h6" style={{ width: "30%", color: "#e2e8f0" }}>
              {`Selected Date:`}
            </Typography>
            <Typography variant="h6" style={{ width: "70%", color: "#94a3b8" }}>
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
            <Typography variant="h5" style={{ width: "30%", color: "#e2e8f0" }}>
              {`Events:`}
            </Typography>
            <Grid item style={{ width: "70%" }}>
              {getSelectedDateEvents().events.length > 0 ? (
                getSelectedDateEvents().events.map((event, idx) => (
                  <Typography
                    key={idx}
                    variant="h6"
                    style={{ color: getPlatformColor(event.type) }}
                  >
                    {`${event.name} [${event.dateObj.toLocaleTimeString(
                      "en-US"
                    )}]`}
                  </Typography>
                ))
              ) : (
                <Typography style={{ color: "#64748b" }}>
                  No events on this date
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {renderCalendarContainer()}
    </Grid>
  );
};

export default UpcomingEventPage;
