import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import image from "../images/marina.jpg";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { GitHub, LinkedIn, MenuBook, TrendingUp } from "@material-ui/icons";
import leetcode from "../images/leetcode.png";
import codeforces from "../images/codeforces.png";
import { openInNewTab } from "../common/common";
import useDialog from "../hooks/useDialog";
import DialogCustom from "../common/dialogCustom";
import atcoder from "../images/atcoder.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  imgContainer: {
    display: "flex",
    height: 400,
    justifyContent: "center",
  },
  contentContainer: {
    padding: "0% 10%",
  },
  iconStyle: {
    margin: "0% 1%",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
  },
}));

const Contact = (props) => {
  const classes = useStyles();

  const { height, width } = useWindowDimensions();
  const smallScreen = width < 720;

  const { open, handleClickOpen, handleClose } = useDialog();

  const renderNavIcon = (icon) => {
    return (
      <Grid item className={classes.iconStyle}>
        {icon}
      </Grid>
    );
  };

  const onClickURL = (url) => {
    return () => openInNewTab(url);
  };

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const onClickIcon = (title, url) => {
    setTitle(title);
    setUrl(url);
    handleClickOpen();
  };

  const onCloseDialog = () => {
    setTitle("");
    setUrl("");
    handleClose();
  };

  const gridIcon = (icon, onClickIcon) => {
    return (
      <Grid item onClick={onClickIcon}>
        {icon}
      </Grid>
    );
  };

  const icons = [
    gridIcon(<GitHub style={{ height: 36, width: 36 }} />, () =>
      onClickIcon("Open Github?", "https://github.com/wenkai-liau")
    ),
    gridIcon(
      <LinkedIn style={{ height: 36, width: 36, color: "#0A66C2" }} />,
      () => onClickIcon("Open Linkedin?", "https://linkedin.com/in/wen-kai")
    ),
    gridIcon(
      <img
        src={leetcode}
        width={36}
        height={36}
        style={{ alignSelf: "center" }}
      />,
      () => onClickIcon("Open Leetcode?", "https://leetcode.com/Lwenkai/")
    ),
    gridIcon(
      <img
        src={codeforces}
        width={36}
        height={36}
        style={{ alignSelf: "center" }}
      />,
      () =>
        onClickIcon(
          "Open Codeforces?",
          "https://codeforces.com/profile/wKai000"
        )
    ),
    gridIcon(
      <img
        src={atcoder}
        width={36}
        height={36}
        style={{ alignSelf: "center" }}
      />,
      () => onClickIcon("Open Atcoder?", "https://atcoder.jp/users/kaicoder0")
    ),
    gridIcon(<MenuBook style={{ height: 36, width: 36 }} />, () =>
      onClickIcon(
        "Open Storygraph?",
        "https://app.thestorygraph.com/profile/lwenkai"
      )
    ),
    gridIcon(<TrendingUp style={{ height: 36, width: 36 }} />, () =>
      onClickIcon("Open CLIST?", "https://clist.by/coder/lwkclist/")
    ),
  ];

  return (
    <div container className={classes.container}>
      <Grid item className={classes.imgContainer}>
        <img
          item
          src={image}
          width={smallScreen ? width * 0.9 : width * 0.7}
          height={smallScreen ? 150 : 350}
          style={{ alignSelf: "center" }}
        />
      </Grid>

      <Grid item className={classes.contentContainer}>
        <Typography
          item
          variant="h3"
          style={{ textAlign: "center", marginBottom: 15 }}
        >
          Related links
        </Typography>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5% 0%" }}
        >
          {icons.map((icon) => renderNavIcon(icon))}
        </Grid>

        <DialogCustom
          title={title}
          content={url}
          open={open}
          handleSubmit={onClickURL(url)}
          handleClose={onCloseDialog}
        />
      </Grid>
    </div>
  );
};

export default Contact;
