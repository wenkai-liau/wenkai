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

const iconStyle = { marginRight: 8, height: 24, width: 24 };

const rows = [
  createData(
    <Grid container alignItems="center">
      <PythonLogo style={iconStyle} /> Python
    </Grid>,
    2, 3
  ),
  createData(
    <Grid container alignItems="center">
      <JavaLogo style={iconStyle} /> Java
    </Grid>,
    2, 3
  ),
  createData(
    <Grid container alignItems="center">
      <JSLogo style={iconStyle} /> Javascript
    </Grid>,
    2, 2
  ),
  createData(
    <Grid container alignItems="center">
      <MatlabLogo style={iconStyle} /> Matlab
    </Grid>,
    1, 1
  ),
  createData(
    <Grid container alignItems="center">
      <TSLogo style={iconStyle} /> Typescript
    </Grid>,
    1, 3
  ),
  createData(
    <Grid container alignItems="center">
      <CLogo style={iconStyle} /> C
    </Grid>,
    0, 0
  ),
  createData(
    <Grid container alignItems="center">
      <PerlLogo style={iconStyle} /> Perl
    </Grid>,
    0, 0
  ),
  createData(
    <Grid container alignItems="center">
      <GoLogo style={iconStyle} /> Go
    </Grid>,
    2, 2
  ),
  createData(
    <Grid container alignItems="center">
      <CPlusLogo style={iconStyle} /> C++
    </Grid>,
    0, 2
  ),
];

const headCells = [
  { id: "language", numeric: false, disablePadding: true, label: "Language" },
  { id: "experience", numeric: true, disablePadding: false, label: "Experience" },
  { id: "preference", numeric: true, disablePadding: false, label: "Preference" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
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
    if (order !== 0) return order;
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
            style={{
              fontWeight: 600,
              color: "#94a3b8",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#94a3b8" }}
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
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: 700,
    background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  paperContainer: {
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "75%",
    },
  },
  tableRow: {
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(56, 189, 248, 0.04) !important",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
  },
  tableCell: {
    color: "#e2e8f0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    fontSize: 14,
    fontWeight: 500,
  },
}));

const BasicTable = () => {
  const classes = useStyles();

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("experience");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const mapExperience = (num) => {
    const styles = {
      0: { color: "#34d399", label: "Comfortable" },
      1: { color: "#fbbf24", label: "Very Comfortable" },
      2: { color: "#f87171", label: "Experienced" },
    };
    const { color, label } = styles[num] || styles[0];
    return (
      <span
        style={{
          color,
          fontWeight: 500,
          fontSize: 13,
          padding: "4px 10px",
          borderRadius: 6,
          backgroundColor: `${color}15`,
        }}
      >
        {label}
      </span>
    );
  };

  const mapPreferences = (num) => {
    const styles = {
      0: { color: "#64748b", label: "Low" },
      1: { color: "#94a3b8", label: "Medium" },
      2: { color: "#38bdf8", label: "High" },
      3: { color: "#a78bfa", label: "Very High" },
    };
    const { color, label } = styles[num] || styles[0];
    return (
      <span
        style={{
          color,
          fontWeight: 500,
          fontSize: 13,
          padding: "4px 10px",
          borderRadius: 6,
          backgroundColor: `${color}15`,
        }}
      >
        {label}
      </span>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" className={classes.sectionTitle}>
        Programming Languages
      </Typography>
      <Paper className={classes.paperContainer} elevation={0}>
        <TableContainer>
          <Table aria-label="programming languages table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, idx) => (
                <TableRow hover key={idx} className={classes.tableRow}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {row.language}
                  </TableCell>
                  <TableCell align="right" className={classes.tableCell}>
                    {mapExperience(row.experience)}
                  </TableCell>
                  <TableCell align="right" className={classes.tableCell}>
                    {mapPreferences(row.preference)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default BasicTable;
