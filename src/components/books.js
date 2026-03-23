import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import image from "../images/craterLake.jpg";
import BookCard from "./bookCard";
import booksJson from "../books/books.json";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { RotateLeft } from "@material-ui/icons";

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
    padding: "1% 5%",
    width: "100%",
    justifyContent: "center",
  },
  logoStyle: {
    height: 50,
    width: 50,
  },
  subContentContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 100,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 250,
    },
  },
  othersContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 50,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 100,
    },
  },
  filterContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "5%",
    marginBottom: "5%",
  },
  filterStyles: {
    [theme.breakpoints.down("xs")]: {
      width: "20%",
      margin: "0% 2%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "10%",
      margin: "0% 3%",
    },
  },
  restartFilterStyle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5em",
    },
    "&:hover": {
      color: "#D3D3D3",
    },
    cursor: "pointer",
  },
}));

const Books = (props) => {
  const classes = useStyles();

  const initFilterState = {
    Status: "All",
    Rating: "All",
    Category: "All",
  };

  const [filter, setFilter] = useState(initFilterState);

  const { height, width } = useWindowDimensions();
  const isPhoneScreen = width < 700;

  const read = booksJson.read;
  const reading = booksJson.reading;
  const toRead = booksJson.toRead;

  const handleChange = (event) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const renderFilters = () => {
    return (
      <Grid container className={classes.filterContainer}>
        <FormControl size="small" className={classes.filterStyles}>
          <InputLabel id="Status">Read</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={filter.Status}
            label="Status"
            onChange={handleChange}
            name="Status"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"read"}>Read</MenuItem>
            <MenuItem value={"reading"}>Reading</MenuItem>
            <MenuItem value={"toRead"}>To Read</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" className={classes.filterStyles}>
          <InputLabel id="Rating">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            value={filter.Rating}
            label="Rating"
            onChange={handleChange}
            name="Rating"
          >
            <MenuItem value={"All"}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={0}>
              <em>0</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" className={classes.filterStyles}>
          <InputLabel id="Category">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={filter.Category}
            label="Category"
            onChange={handleChange}
            name="Category"
          >
            <MenuItem value={"All"}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={"Technical"}>
              <em>Technical</em>
            </MenuItem>
            <MenuItem value={"History"}>History</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>

        <Tooltip title={"Reset"}>
          <RotateLeft
            className={classes.restartFilterStyle}
            onClick={resetFilter}
          />
        </Tooltip>
      </Grid>
    );
  };

  const resetFilter = (e) => {
    setFilter(initFilterState);
  };

  const filterBooks = () => {
    const allBooks = [...read, ...reading, ...toRead];

    let filteredBooks =
      filter.Status === "All"
        ? allBooks
        : allBooks.filter((book) => book.status === filter.Status);
    if (filter.Rating !== "All") {
      filteredBooks = filteredBooks.filter(
        (book) => book.rating === filter.Rating
      );
    }
    if (filter.Category !== "All") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === filter.Category
      );
    }
    return filteredBooks;
  };

  return (
    <div className={classes.container}>
      <Grid item className={classes.imgContainer}>
        <img
          src={image}
          width={width * 0.9}
          height={isPhoneScreen ? 150 : height * 0.4}
          style={{ alignSelf: "center" }}
        />
      </Grid>

      {renderFilters()}

      <Grid item container className={classes.contentContainer}>
        {filterBooks().map(
          (book, idx) =>
            book !== undefined && (
              <BookCard key={idx} status={book.status} bookData={book} />
            )
        )}
      </Grid>
    </div>
  );
};

export default Books;
