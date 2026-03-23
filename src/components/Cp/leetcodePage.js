import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Calendar.css";
import _ from "lodash";
import useLeetcode from "../../hooks/useLeetcode";
import { Doughnut } from "react-chartjs-2";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SendOutlined } from "@material-ui/icons";
import { openInNewTab } from "../../common/common";
import DialogCustom from "../../common/dialogCustom";
import leetcode from "../../images/leetcode.png";
import useDialog from "../../hooks/useDialog";

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
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0% 5%",
    },
  },
  itemContainer: {
    justifyContent: "center",
    height: 300,
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      margin: 20,
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  cardContainer: {
    margin: "10px 0px",
  },
}));

const LeetcodePage = (props) => {
  const classes = useStyles();
  const data = _.defaultTo(useLeetcode(), {});

  const { open, handleClickOpen, handleClose } = useDialog();

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
    return <Doughnut data={data} options={options} height={250} />;
  };

  const solvedCount = [
    _.defaultTo(data.easySolved, 0),
    _.defaultTo(data.mediumSolved, 0),
    _.defaultTo(data.hardSolved, 0),
  ];

  const { height, width } = useWindowDimensions();
  const isPhoneSize = width < 700;

  const renderStats = (title, text, color) => {
    const font = isPhoneSize ? "body2" : "body1";
    return (
      <Grid item container>
        <Typography
          variant={font}
          style={{ width: "60%", color, fontWeight: "bold" }}
        >
          {`${title}`}
        </Typography>
        <Typography
          variant={font}
          style={{ width: "40%", color, fontWeight: "bold" }}
        >
          {text}
        </Typography>
      </Grid>
    );
  };

  const onClickURL = (url) => {
    return () => openInNewTab(url);
  };

  const dialogTitle = (text) => {
    return (
      <Grid container justifyContent="space-between">
        <Grid item>{text}</Grid>
        <img
          src={leetcode}
          width={24}
          height={24}
          style={{ alignSelf: "center" }}
        />
      </Grid>
    );
  };

  return (
    <Grid item container className={classes.container}>
      <Grid item container className={classes.navButtonStyle}>
        <Button
          color="primary"
          variant="contained"
          endIcon={<SendOutlined />}
          onClick={handleClickOpen}
        >
          To Leetcode
        </Button>
        <DialogCustom
          title={dialogTitle("Open new tab?")}
          content={"https://leetcode.com/Lwenkai/"}
          open={open}
          handleSubmit={onClickURL("https://leetcode.com/Lwenkai/")}
          handleClose={handleClose}
        />
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: 170,
          padding: "1% 0%",
          position: "relative",
        }}
      >
        <Card
          style={{
            width: isPhoneSize ? "50%" : "30%",
            height: "100%",
            margin: "0% 10%",
          }}
        >
          <CardContent>
            {renderStats("Handle: ", "Lwenkai", "#494848")}
            {renderStats("Ranking: ", _.defaultTo(data.ranking, 0), "#494848")}
            {renderStats(
              "Contribution: ",
              _.defaultTo(data.contributionPoints, 0),
              "#494848"
            )}
            {renderStats(
              "Acceptance: ",
              `${_.defaultTo(data.acceptanceRate, 0)} %`,
              "#494848"
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item className={classes.itemContainer} style={{ padding: "0 7%" }}>
        {renderDoughnut(
          "Solved",
          ["Easy", "Medium", "Hard"],
          solvedCount,
          ["#4C9A2A", "#FF8C00", "#DC143C"],
          false
        )}
      </Grid>

      <Grid item className={classes.itemContainer} container>
        <Grid item container alignItems="center" style={{ width: "40%" }}>
          {renderDoughnut(
            "",
            ["Accepted", "Not Accepted"],
            [data.acceptanceRate, 100 - data.acceptanceRate],
            ["red", "blue"]
          )}
        </Grid>

        <Grid
          item
          container
          style={{
            width: "60%",
            justifyContent: "center",
            height: "100%",
            paddingLeft: "2%",
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            style={{ fontWeight: "bold", color: "#636363", margin: "10px 0px" }}
          >
            Wen Kai Status
          </Grid>
          <Grid item container style={{ width: "100%" }}>
            {renderStats("Ranking: ", data.ranking)}
            {renderStats(
              "Total Qns Solved: ",
              `${_.defaultTo(data.totalSolved, 0)} / ${_.defaultTo(
                data.totalQuestions,
                0
              )}`
            )}
            {renderStats(
              "Easy Qns Solved: ",
              `${_.defaultTo(data.easySolved, 0)} / ${_.defaultTo(
                data.totalEasy,
                0
              )}`,
              "#4C9A2A"
            )}
            {renderStats(
              "Medium Qns Solved: ",
              `${_.defaultTo(data.mediumSolved, 0)} / ${_.defaultTo(
                data.totalMedium,
                0
              )}`,
              "#FF8C00"
            )}
            {renderStats(
              "Hard Qns Solved: ",
              `${_.defaultTo(data.hardSolved, 0)} / ${_.defaultTo(
                data.totalHard,
                0
              )}`,
              "#DC143C"
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeetcodePage;
