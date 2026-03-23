import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import logo from "../svg/react_logo.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#0d1117",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    [theme.breakpoints.down("xs")]: {
      height: 50,
      padding: "0 4%",
    },
    [theme.breakpoints.up("sm")]: {
      height: 64,
      padding: "0 5%",
    },
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "#64748b",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: 11,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
    },
  },
  rotateIcon: {
    animation: "$spin 7s linear infinite",
    [theme.breakpoints.down("xs")]: {
      height: 22,
      width: 22,
    },
    [theme.breakpoints.up("sm")]: {
      height: 30,
      width: 30,
    },
    filter: "brightness(0.7)",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  byText: {
    color: "#475569",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: 11,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
    },
  },
}));

const FooterBar = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.leftSection}>
        <Typography className={classes.text}>Built with React</Typography>
        <img src={logo} className={classes.rotateIcon} alt="React" />
      </div>
      <Typography className={classes.byText}>
        © {new Date().getFullYear()} Wen Kai
      </Typography>
    </Grid>
  );
};

export default FooterBar;
