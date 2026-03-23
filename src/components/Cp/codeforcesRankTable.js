import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import * as React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const headCells = [
  {
    id: "contestId",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "contestName",
    numeric: true,
    disablePadding: false,
    label: "Contest Name",
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "rank",
    numeric: true,
    disablePadding: false,
    label: "Rank",
  },
  {
    id: "solved",
    numeric: true,
    disablePadding: false,
    label: "Solved",
  },
  {
    id: "ratingChange",
    numeric: true,
    disablePadding: false,
    label: "Rating Change",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperContainer: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      width: 350,
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
  tableContainer: {
    [theme.breakpoints.down("xs")]: {
      height: 350,
    },
    [theme.breakpoints.up("sm")]: {
      height: 500,
    },
  },
}));

const CodeforcesRankTable = ({ ratingData, idSolved }) => {
  const classes = useStyles();
  const rows = ratingData ? ratingData : [];
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("startDate");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const renderRatingChange = (row) => {
    const diff = row.newRating - row.oldRating;
    return (
      <Grid container>
        {diff <= 0 ? (
          <ArrowDownward style={{ color: "red" }} />
        ) : (
          <ArrowUpward style={{ color: "green" }} />
        )}
        <Typography style={{ color: diff <= 0 ? "red" : "green" }}>
          {diff}
        </Typography>
      </Grid>
    );
  };

  const convertDate = (ms) => {
    const d = new Date(ms * 1000);
    return d.toDateString();
  };

  return (
    <Grid container className={classes.root}>
      <Typography variant="h4">Contest History</Typography>
      <Paper className={classes.paperContainer}>
        <TableContainer className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.contestId}
                  </TableCell>
                  <TableCell align="left">{row.contestName}</TableCell>
                  <TableCell align="left">
                    {convertDate(row.startDate)}
                  </TableCell>
                  <TableCell align="left">{row.rank}</TableCell>
                  <TableCell align="left">{idSolved[row.contestId]}</TableCell>
                  <TableCell align="left">{renderRatingChange(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default CodeforcesRankTable;
