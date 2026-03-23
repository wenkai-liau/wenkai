import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import image from "../images/craterLake.jpg";
import BookCard from "./bookCard";
import booksJson from "../books/books.json";
import { RotateLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0a0f1a",
  },
  heroWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    objectFit: "cover",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      height: 180,
    },
    [theme.breakpoints.up("sm")]: {
      height: 350,
    },
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: "linear-gradient(to top, #0a0f1a 0%, transparent 100%)",
    pointerEvents: "none",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.45)",
    zIndex: 1,
  },
  heroTextOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  heroTitle: {
    fontWeight: 800,
    color: "#fff",
    textShadow: "0 4px 30px rgba(0,0,0,0.6)",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
  },
  contentContainer: {
    padding: "20px 5%",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
  },
  filterContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 30,
    flexWrap: "wrap",
    padding: "20px 0",
  },
  filterControl: {
    minWidth: 120,
    "& .MuiInputLabel-root": {
      color: "#64748b",
    },
    "& .MuiSelect-root": {
      color: "#e2e8f0",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255,255,255,0.1)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#38bdf8",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#38bdf8",
    },
    "& .MuiSelect-icon": {
      color: "#64748b",
    },
  },
  resetBtn: {
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1.8em",
    "&:hover": {
      color: "#38bdf8",
      transform: "rotate(-180deg)",
    },
  },
  booksGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
}));

const Books = () => {
  const classes = useStyles();

  const initFilterState = {
    Status: "All",
    Rating: "All",
    Category: "All",
  };

  const [filter, setFilter] = useState(initFilterState);

  const read = booksJson.read;
  const reading = booksJson.reading;
  const toRead = booksJson.toRead;

  const handleChange = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const resetFilter = () => setFilter(initFilterState);

  const filterBooks = () => {
    const allBooks = [...read, ...reading, ...toRead];
    let filteredBooks =
      filter.Status === "All"
        ? allBooks
        : allBooks.filter((book) => book.status === filter.Status);
    if (filter.Rating !== "All") {
      filteredBooks = filteredBooks.filter((book) => book.rating === filter.Rating);
    }
    if (filter.Category !== "All") {
      filteredBooks = filteredBooks.filter((book) => book.category === filter.Category);
    }
    return filteredBooks;
  };

  return (
    <div className={classes.container}>
      {/* Hero */}
      <div className={classes.heroWrapper}>
        <img src={image} alt="Books" className={classes.heroImage} />
        <div className={classes.heroOverlay} />
        <div className={classes.heroGradient} />
        <div className={classes.heroTextOverlay}>
          <Typography className={classes.heroTitle}>My Bookshelf</Typography>
        </div>
      </div>

      <div className={classes.contentContainer}>
        {/* Filters */}
        <div className={classes.filterContainer}>
          <FormControl size="small" className={classes.filterControl}>
            <InputLabel id="Status">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={filter.Status}
              label="Status"
              onChange={handleChange}
              name="Status"
            >
              <MenuItem value="All"><em>All</em></MenuItem>
              <MenuItem value="read">Read</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="toRead">To Read</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className={classes.filterControl}>
            <InputLabel id="Rating">Rating</InputLabel>
            <Select
              labelId="rating-label"
              id="rating"
              value={filter.Rating}
              label="Rating"
              onChange={handleChange}
              name="Rating"
            >
              <MenuItem value="All"><em>All</em></MenuItem>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" className={classes.filterControl}>
            <InputLabel id="Category">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={filter.Category}
              label="Category"
              onChange={handleChange}
              name="Category"
            >
              <MenuItem value="All"><em>All</em></MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Reset filters">
            <RotateLeft className={classes.resetBtn} onClick={resetFilter} />
          </Tooltip>
        </div>

        {/* Book Cards */}
        <div className={classes.booksGrid}>
          {filterBooks().map(
            (book, idx) =>
              book !== undefined && (
                <BookCard key={idx} status={book.status} bookData={book} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
