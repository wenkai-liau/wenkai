import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import useCodeforces from "../../hooks/useCodeforces";
import CodeforcesRankTable from "./codeforcesRankTable";
import _ from "lodash";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SendOutlined } from "@material-ui/icons";
import { openInNewTab } from "../../common/common";
import useDialog from "../../hooks/useDialog";
import DialogCustom from "../../common/dialogCustom";
import codeforces from "../../images/codeforces.png";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const submissionStatusColors = {
  WRONG_ANSWER: "#d62d20",
  OK: "#008744",
  TIME_LIMIT_EXCEEDED: "#0057e7",
  RUNTIME_ERROR: "#d11141",
  SKIPPED: "#5e5656",
  COMPILATION_ERROR: "#afafaf",
  MEMORY_LIMIT_EXCEEDED: "#ffa700",
};

const divisionColors = {
  2: "#cc2a36",
  3: "#eb6841",
  4: "#edc951",
  Global: "#8B0000",
};

const barChartColors = ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94"];

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    margin: "2% 1%",
  },
  navButtonStyle: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      padding: "0% 10%",
      margin: "10px 0%",
      // height: 250,
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0% 5%",
      // height: 300,
    },
  },
  doughtnutsContainer: {
    alignItems: "center",
    padding: 5,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: 250,
    },
    [theme.breakpoints.up("sm")]: {
      height: 300,
    },
  },
  doughtnutContainer: {
    height: "100%",
    border: "1px solid black",
    borderRadius: 15,
    justifyContent: "center",
    padding: 5,
    margin: "1% 2%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
  },
}));

const CodeforcesPage = (props) => {
  const classes = useStyles();
  const {
    ratingData,
    submissionsData,
    idSolved,
    categories,
    submissionStatus,
  } = useCodeforces();

  const { open, handleClickOpen, handleClose } = useDialog();

  const getContestDistribution = () => {
    const divLevels = { 2: 0, 3: 0, 4: 0, Global: 0 };
    _.forEach(ratingData, (item) => {
      const contestName = item.contestName;
      if (contestName.includes("Div. 2")) {
        divLevels[2] += 1;
      } else if (contestName.includes("Div. 3")) {
        divLevels[3] += 1;
      } else if (contestName.includes("Div. 4")) {
        divLevels[4] += 1;
      } else {
        divLevels["Global"] += 1;
      }
    });
    return divLevels;
  };

  const renderDoughnut = (
    title,
    labels,
    values,
    colors,
    disableLegend = true
  ) => {
    const datasets = [
      {
        label: title,
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ];

    const data = {
      labels,
      datasets,
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
          },
        },
        legend: {
          display: !disableLegend,
          position: "right",
        },
      },
    };

    return <Doughnut data={data} options={options} height={100} />;
  };

  const renderBarChart = (labels, values, backgroundColor) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16,
          },
          display: true,
          text: "Problem Categories",
        },
      },
    };

    const barData = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor,
        },
      ],
    };

    return <Bar options={options} data={barData} />;
  };

  const { height, width } = useWindowDimensions();
  const isPhoneScreen = width < 700;

  const divisionBreakdown = getContestDistribution();
  let sortedCategories = _.map(Object.entries(categories), (item) => {
    return { name: item[0], val: item[1] };
  });
  sortedCategories = _.orderBy(sortedCategories, ["val"], ["desc"]);
  const maxVal = _.max(sortedCategories.map((item) => item.val));
  const scaleRatio = maxVal / (barChartColors.length - 1);

  const getBarColor = (val) => {
    return barChartColors[Math.round(val / scaleRatio)];
  };

  const onClickURL = (url) => {
    return () => openInNewTab(url);
  };

  const dialogTitle = (text) => {
    return (
      <Grid container justifyContent="space-between">
        <Grid item>{text}</Grid>
        <img
          src={codeforces}
          width={24}
          height={24}
          style={{ alignSelf: "center" }}
        />
      </Grid>
    );
  };

  return (
    <Grid container item className={classes.container}>
      <Grid item container className={classes.navButtonStyle}>
        <Button
          color="primary"
          variant="contained"
          endIcon={<SendOutlined />}
          onClick={handleClickOpen}
        >
          Codeforces
        </Button>
        <DialogCustom
          title={dialogTitle("Open new tab?")}
          content={"https://codeforces.com/profile/wKai000"}
          open={open}
          handleSubmit={onClickURL("https://codeforces.com/profile/wKai000")}
          handleClose={handleClose}
        />
      </Grid>

      <Grid container item className={classes.doughtnutsContainer}>
        <Grid item container className={classes.doughtnutContainer}>
          {renderDoughnut(
            `Submit Status (${_.sum(_.values(submissionStatus))})`,
            _.keys(submissionStatus),
            _.values(submissionStatus),
            _.keys(submissionStatus).map((key) => submissionStatusColors[key]),
            false
          )}
        </Grid>
        <Grid item container className={classes.doughtnutContainer}>
          {renderDoughnut(
            `Contest Division (${_.sum(_.values(divisionBreakdown))})`,
            _.keys(divisionBreakdown).map((item) => `Div ${item}`),
            _.values(divisionBreakdown),
            _.keys(divisionBreakdown).map((key) => divisionColors[key]),
            false
          )}
        </Grid>
      </Grid>

      <Grid
        item
        container
        style={{
          marginTop: isPhoneScreen ? 300 : 150,
          marginBottom: isPhoneScreen ? 50 : 100,
        }}
      >
        {renderBarChart(
          sortedCategories.map((item) => item.name),
          sortedCategories.map((item) => item.val),
          sortedCategories.map((item) => getBarColor(item.val))
        )}
      </Grid>

      <CodeforcesRankTable ratingData={ratingData} idSolved={idSolved} />
    </Grid>
  );
};

export default CodeforcesPage;
