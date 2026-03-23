import { Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { AccessTime, Code, Link } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import codeforces from "../../images/codeforces.png";
import leetcode from "../../images/leetcode.png";
import TabPanel from "../../common/tabPanel";
import CodeforcesPage from "./codeforcesPage";
import UpcomingEventPage from "./upcomingEventPage";
import LeetcodePage from "./leetcodePage";
import AtcoderPage from "./atcoderPages";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: "2% 1%",
    // backgroundColor: 'grey'
  },
  imgContainer: {
    display: "flex",
    height: 400,
    justifyContent: "center",
  },
}));

const CP = (props) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const createText = (text, icon) => {
    return (
      <Grid container item alignItems="center">
        {icon}
        <Typography variant="caption" style={{ marginLeft: 5 }}>
          {text}
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid item container className={classes.container}>
      <Tabs
        onChange={handleTabChange}
        value={tabValue}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          className={classes.tabStyles}
          value={0}
          label={createText("Upcoming", <AccessTime />)}
        />
        <Tab
          className={classes.tabStyles}
          value={1}
          label={createText(
            "Leetcode",
            <img
              src={leetcode}
              width={24}
              height={24}
              style={{ alignSelf: "center" }}
            />
          )}
        />
        <Tab
          className={classes.tabStyles}
          value={2}
          label={createText(
            "Codeforces",
            <img
              src={codeforces}
              width={24}
              height={24}
              style={{ alignSelf: "center" }}
            />
          )}
        />
        <Tab
          className={classes.tabStyles}
          value={3}
          label={createText("Atcoder", <Link />)}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <UpcomingEventPage />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <LeetcodePage />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <CodeforcesPage />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <AtcoderPage />
      </TabPanel>
    </Grid>
  );
};

export default CP;
