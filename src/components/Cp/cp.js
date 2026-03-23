import { Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { AccessTime, Code, Link } from "@material-ui/icons";
import React, { useState } from "react";
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
    padding: "80px 2% 20px",
    backgroundColor: "#0a0f1a",
    minHeight: "100vh",
  },
  tabsRoot: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
  tabRoot: {
    color: "#94a3b8",
    fontWeight: 500,
    textTransform: "none",
    minWidth: 100,
    "&.Mui-selected": {
      color: "#38bdf8",
    },
  },
  tabIndicator: {
    backgroundColor: "#38bdf8",
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
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabIndicator,
        }}
      >
        <Tab
          classes={{ root: classes.tabRoot }}
          value={0}
          label={createText("Upcoming", <AccessTime />)}
        />
        <Tab
          classes={{ root: classes.tabRoot }}
          value={1}
          label={createText(
            "Leetcode",
            <img
              src={leetcode}
              width={24}
              height={24}
              alt="LeetCode"
              style={{ alignSelf: "center" }}
            />
          )}
        />
        <Tab
          classes={{ root: classes.tabRoot }}
          value={2}
          label={createText(
            "Codeforces",
            <img
              src={codeforces}
              width={24}
              height={24}
              alt="Codeforces"
              style={{ alignSelf: "center" }}
            />
          )}
        />
        <Tab
          classes={{ root: classes.tabRoot }}
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
