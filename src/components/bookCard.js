import {
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Build,
  History,
  LibraryBooks,
  Star,
  CheckCircle,
  Cancel,
  MoreHoriz,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    background: "rgba(17, 24, 39, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid rgba(56, 189, 248, 0.2)",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(56, 189, 248, 0.08)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: 16,
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 20px)",
      padding: 24,
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(50% - 20px)",
    },
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  title: {
    fontWeight: 700,
    color: "#e2e8f0",
    marginBottom: 8,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
  },
  comments: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 12,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  meta: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    marginBottom: 4,
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 6,
    color: "#475569",
  },
  starIcon: {
    [theme.breakpoints.down("xs")]: {
      height: 16,
      width: 16,
    },
    [theme.breakpoints.up("sm")]: {
      height: 20,
      width: 20,
    },
    color: "#fbbf24",
  },
  unstarIcon: {
    [theme.breakpoints.down("xs")]: {
      height: 16,
      width: 16,
    },
    [theme.breakpoints.up("sm")]: {
      height: 20,
      width: 20,
    },
    color: "#334155",
  },
  ratingContainer: {
    marginTop: 8,
  },
  categoryBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    marginTop: 8,
  },
}));

const BookCard = (props) => {
  const classes = useStyles();
  const status = props.status;
  const { title, author, rating, comments, category } = props.bookData;

  const getCategoryStyle = (cat) => {
    switch (cat) {
      case "Technical":
        return { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.1)", icon: <Build style={{ fontSize: 14, marginRight: 4 }} /> };
      case "History":
        return { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.1)", icon: <History style={{ fontSize: 14, marginRight: 4 }} /> };
      default:
        return { color: "#a78bfa", bg: "rgba(167, 139, 250, 0.1)", icon: <LibraryBooks style={{ fontSize: 14, marginRight: 4 }} /> };
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "read":
        return (
          <Tooltip title="Read">
            <CheckCircle style={{ color: "#34d399", fontSize: 24 }} />
          </Tooltip>
        );
      case "reading":
        return (
          <Tooltip title="Currently Reading">
            <MoreHoriz style={{ color: "#fbbf24", fontSize: 24 }} />
          </Tooltip>
        );
      case "toRead":
        return (
          <Tooltip title="To Read">
            <Cancel style={{ color: "#f87171", fontSize: 24 }} />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const catStyle = getCategoryStyle(category);

  return (
    <div className={classes.root}>
      <div className={classes.statusBadge}>{renderStatusIcon(status)}</div>

      <Typography className={classes.title}>{title}</Typography>

      <Tooltip title={comments || ""}>
        <Typography className={classes.comments}>{comments}</Typography>
      </Tooltip>

      <div className={classes.meta}>
        <span>by {author}</span>
      </div>

      <div
        className={classes.categoryBadge}
        style={{ color: catStyle.color, backgroundColor: catStyle.bg }}
      >
        {catStyle.icon}
        {category}
      </div>

      <div className={classes.ratingContainer}>
        {[...Array(5)].map((_, idx) => (
          <Star
            key={idx}
            className={idx < rating ? classes.starIcon : classes.unstarIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCard;
