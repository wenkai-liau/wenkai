import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Calendar.css";
import _ from "lodash";
import { openInNewTab } from "../../common/common";
import { Link, SendOutlined } from "@material-ui/icons";
import useDialog from "../../hooks/useDialog";
import DialogCustom from "../../common/dialogCustom";

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
}));

const AtcoderPage = (props) => {
  const classes = useStyles();

  const onClickURL = (url) => {
    return () => openInNewTab(url);
  };

  const dialogTitle = (text) => {
    return (
      <Grid container justifyContent="space-between">
        <Grid item>{text}</Grid>
        <Link />
      </Grid>
    );
  };

  const { open, handleClickOpen, handleClose } = useDialog();

  return (
    <Grid item container className={classes.container}>
      <Grid item container className={classes.navButtonStyle}>
        <Button
          color="primary"
          variant="contained"
          endIcon={<SendOutlined />}
          onClick={handleClickOpen}
        >
          Atcoder
        </Button>
        <DialogCustom
          title={dialogTitle("Open new tab?")}
          content={"https://atcoder.jp/users/kaicoder0"}
          open={open}
          handleSubmit={onClickURL("https://atcoder.jp/users/kaicoder0")}
          handleClose={handleClose}
        />
      </Grid>
    </Grid>
  );
};

export default AtcoderPage;
