import {
  Grid,
  ListItemIcon,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Build,
  History,
  LibraryBooks,
  Star,
  Image,
  Done,
  Close,
  MoreHoriz,
  CheckCircle,
  Cancel,
} from "@material-ui/icons";
import React from "react";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  readStatusIcon: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.5em",
    },
  },
  root: {
    position: "relative",
    "&:hover": {
      backgroundColor: "#D3D3D3",
    },
    border: "1px solid black",
    borderRadius: 20,
    // backgroundColor: 'red',
    [theme.breakpoints.down("xs")]: {
      height: 200,
      width: "70%",
      padding: "3%",
      margin: "2%",
    },
    [theme.breakpoints.up("sm")]: {
      height: 350,
      width: "45%",
      padding: "2%",
      margin: "2%",
    },
    alignItems: "space-between",
  },
  contentContainer: {
    height: "100%",
    width: "60%",
    // backgroundColor: 'green',
    alignItems: "flex-start",
  },
  imageContainer: {
    width: "40%",
    //   backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontWeight: "bold",
    width: "100%",
    height: "25%",
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
      marginBottom: 5,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 25,
      marginBottom: 10,
    },
  },
  commentsStyle: {
    width: "100%",
    height: "15%",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
      marginBottom: 5,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
      marginBottom: 10,
    },
  },
  authorStyle: {
    height: "7%",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 15,
    },
  },
  iconStyle: {
    fontSize: 18,
    marginLeft: 3,
  },
  starIcon: {
    [theme.breakpoints.down("xs")]: {
      height: 15,
      width: 15,
    },
    [theme.breakpoints.up("sm")]: {
      height: 25,
      width: 25,
    },
    color: "#FFD700",
  },
  unstarIcon: {
    [theme.breakpoints.down("xs")]: {
      height: 15,
      width: 15,
    },
    [theme.breakpoints.up("sm")]: {
      height: 25,
      width: 25,
    },
    color: "#808080",
  },
}));

const BookCard = (props) => {
  const classes = useStyles();
  const status = props.status;
  const { title, author, rating, difficulty, comments, category } =
    props.bookData;

  const renderCategoryIcon = (category) => {
    switch (category) {
      case "Technical":
        return <Build className={classes.iconStyle} />;
      case "History":
        return <History className={classes.iconStyle} />;
      default:
        return <LibraryBooks className={classes.iconStyle} />;
    }
  };

  const renderRatingAndDificultyContainer = (rating, difficulty) => {
    return (
      <Grid container item>
        <Grid item>
          {[...Array(rating)].map((idx) => (
            <Star key={idx} className={classes.starIcon} />
          ))}
          {[...Array(5 - rating)].map((idx) => (
            <Star key={idx} className={classes.unstarIcon} />
          ))}
        </Grid>
      </Grid>
    );
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "read":
        return (
          <CheckCircle
            className={classes.readStatusIcon}
            style={{ color: "#32CD32" }}
          />
        );
      case "reading":
        return (
          <MoreHoriz
            className={classes.readStatusIcon}
            style={{ color: "#FFBF00" }}
          />
        );
      case "toRead":
        return (
          <Cancel
            className={classes.readStatusIcon}
            style={{ color: "#ff0000" }}
          />
        );
      default:
        return <ListItemIcon />;
    }
  };

  const renderStatusContainer = (status) => {
    return (
      <Grid style={{ position: "absolute", right: "3%", top: "3%" }}>
        {renderStatusIcon(status)}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.root}>
      {renderStatusContainer(status)}
      <Grid container className={classes.contentContainer}>
        <Typography className={classes.titleStyle}>{title}</Typography>

        <Tooltip title={comments}>
          <Typography
            noWrap
            className={classes.commentsStyle}
            style={{ justifyContent: "flex-start" }}
          >
            {comments}
          </Typography>
        </Tooltip>

        <Typography noWrap className={classes.authorStyle}>
          {`Author: ${author}`}
        </Typography>

        <Grid item container alignItems="center">
          <Typography noWrap className={classes.authorStyle}>
            {`Category: ${category}`}
          </Typography>
          {renderCategoryIcon(category)}
        </Grid>
        {renderRatingAndDificultyContainer(rating, difficulty)}
      </Grid>

      <Grid item container className={classes.imageContainer}>
        <Image style={{ height: "80%", width: "80%", color: "#808080" }} />
      </Grid>
    </Grid>
  );
};

export default BookCard;
