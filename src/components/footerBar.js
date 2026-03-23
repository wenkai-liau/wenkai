import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import "../App.css";
import logo from "../svg/react_logo.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#242e2b",
    [theme.breakpoints.down("xs")]: {
      height: 50,
    },
    [theme.breakpoints.up("sm")]: {
      height: 70,
    },
    justifyContent: "space-between",
    padding: "0% 2%",
  },
  gridContainer: {
    alignItems: "center",
    display: "flex",
  },
  typographyContainerOne: {
    color: "#a8adac",
    fontWeight: "bold",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  typographyContainerTwo: {
    display: "flex",
    color: "#a8adac",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  rotateIcon: {
    animation: "$spin 7s linear infinite",
    [theme.breakpoints.down("xs")]: {
      height: 30,
      width: 30,
    },
    [theme.breakpoints.up("sm")]: {
      height: 50,
      width: 50,
    },
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
}));

const FooterBar = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.gridContainer}>
        <Typography className={classes.typographyContainerOne}>
          Created With React
        </Typography>
        <Grid item>
          <img src={logo} className={classes.rotateIcon} />
        </Grid>
      </Grid>

      <Typography className={classes.typographyContainerTwo}>
        By Wen Kai
      </Typography>
    </Grid>
  );
};

export default FooterBar;
