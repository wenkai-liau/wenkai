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

import { ReactComponent as PythonLogo } from "../svg/python.svg";
import { ReactComponent as JavaLogo } from "../svg/java.svg";
import { ReactComponent as JSLogo } from "../svg/javascript.svg";
import { ReactComponent as TSLogo } from "../svg/typescript.svg";
import { ReactComponent as CLogo } from "../svg/c.svg";
import { ReactComponent as MatlabLogo } from "../svg/matlab.svg";
import { ReactComponent as PerlLogo } from "../svg/perl.svg";
import { ReactComponent as GoLogo } from "../svg/golang.svg";
import { ReactComponent as CPlusLogo } from "../svg/cplus.svg";

import * as React from "react";

function createData(language, experience, preference) {
  return { language, experience, preference };
}

const rows = [
  createData(
    <Grid container alignItems="center">
      <PythonLogo
        style={{ marginRight: 2, height: 30, width: 30 }}
      ></PythonLogo>
      Python
    </Grid>,
    2,
    3
  ),
  createData(
    <Grid container alignItems="center">
      <JavaLogo style={{ marginRight: 2, height: 30, width: 30 }}></JavaLogo>
      Java
    </Grid>,
    2,
    3
  ),
  createData(
    <Grid container alignItems="center">
      <JSLogo style={{ marginRight: 2, height: 30, width: 30 }}></JSLogo>
      Javascript
    </Grid>,
    2,
    2
  ),
  createData(
    <Grid container alignItems="center">
      <MatlabLogo
        style={{ marginRight: 2, height: 30, width: 30 }}
      ></MatlabLogo>
      Matlab
    </Grid>,
    1,
    1
  ),
  createData(
    <Grid container alignItems="center">
      <TSLogo style={{ marginRight: 2, height: 30, width: 30 }}></TSLogo>
      Typescript
    </Grid>,
    1,
    3
  ),
  createData(
    <Grid container alignItems="center">
      <CLogo style={{ marginRight: 2, height: 30, width: 30 }}></CLogo>C
    </Grid>,
    0,
    0
  ),
  createData(
    <Grid container alignItems="center">
      <PerlLogo style={{ marginRight: 2, height: 30, width: 30 }}></PerlLogo>
      Perl
    </Grid>,
    0,
    0
  ),
  createData(
    <Grid container alignItems="center">
      <GoLogo style={{ marginRight: 2, height: 30, width: 30 }}></GoLogo>
      Go
    </Grid>,
    2,
    2
  ),
  createData(
    <Grid container alignItems="center">
      <CPlusLogo style={{ marginRight: 2, height: 30, width: 30 }}></CPlusLogo>
      C++
    </Grid>,
    0,
    2
  ),
];

const headCells = [
  {
    id: "language",
    numeric: false,
    disablePadding: true,
    label: "Language",
  },
  {
    id: "experience",
    numeric: true,
    disablePadding: false,
    label: "Experience",
  },
  {
    id: "preference",
    numeric: true,
    disablePadding: false,
    label: "Preference",
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
            align={headCell.numeric ? "right" : "left"}
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
  paperContainer: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "75%",
    },
  },
}));

const BasicTable = (props) => {
  const classes = useStyles();

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("experience");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const mapExperience = (num) => {
    if (num === 0) {
      return <Grid style={{ color: "#228B22" }}>Comfortable</Grid>;
    } else if (num === 1) {
      return <Grid style={{ color: "	#ff8503" }}>Very Comfortable</Grid>;
    } else {
      return <Grid style={{ color: "red" }}>Experienced</Grid>;
    }
  };

  const mapPreferences = (num) => {
    if (num === 0) {
      return <Grid style={{ color: "#ffbaba" }}>Low</Grid>;
    } else if (num === 1) {
      return <Grid style={{ color: "#ff5252" }}>Medium</Grid>;
    } else if (num === 2) {
      return <Grid style={{ color: "#ff0000" }}>High</Grid>;
    } else {
      return <Grid style={{ color: "#a70000" }}>Very High</Grid>;
    }
  };

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 200,
      }}
    >
      <Typography variant="h4">Programming Languages</Typography>
      <Paper className={classes.paperContainer}>
        <TableContainer>
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
                    {row.language}
                  </TableCell>
                  <TableCell align="right">
                    {mapExperience(row.experience)}
                  </TableCell>
                  <TableCell align="right">
                    {mapPreferences(row.preference)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default BasicTable;
