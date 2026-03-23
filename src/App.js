import {
  createTheme,
  Grid,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import HeaderBar from "./components/header";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./components/about";
import FooterBar from "./components/footerBar";
import Books from "./components/books";
import { Helmet } from "react-helmet";
import favicon from "./favicon.ico";
import error_page from "./images/doge_error.png";
import CP from "./components/Cp/cp";
import Contact from "./components/contact";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#0a0f1a",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
  },
  errorImageStyle: {
    alignSelf: "center",
    borderRadius: 12,
    [theme.breakpoints.down("xs")]: {
      margin: "5%",
      height: "100%",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40%",
      height: "40%",
    },
  },
  errorPageStyle: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: "5% 0",
    [theme.breakpoints.down("xs")]: {
      margin: "5%",
      height: "100%",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "1%",
      height: "100%",
      width: "100%",
    },
  },
  errorText: {
    color: "#94a3b8",
    marginTop: 20,
  },
}));

const App = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const tabString = currentPath.split("/");
    switch (tabString.at(-1)) {
      case "cp":
        setTabValue(1);
        return;
      case "books":
        setTabValue(2);
        return;
      case "contact":
        setTabValue(3);
        return;
      default:
        setTabValue(0);
        return;
    }
  }, []);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  let theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#38bdf8",
        light: "#7dd3fc",
        dark: "#0284c7",
      },
      secondary: {
        main: "#a78bfa",
        light: "#c4b5fd",
        dark: "#7c3aed",
      },
      background: {
        default: "#0a0f1a",
        paper: "#111827",
      },
      text: {
        primary: "#e2e8f0",
        secondary: "#94a3b8",
      },
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400, color: "#94a3b8" },
    },
    shape: {
      borderRadius: 12,
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: "#0a0f1a",
            color: "#e2e8f0",
          },
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: "#111827",
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const errorPage = () => {
    return (
      <Grid item container className={classes.errorPageStyle}>
        <img src={error_page} className={classes.errorImageStyle} alt="Error" />
        <Typography variant="h4" className={classes.errorText}>
          Page not found
        </Typography>
      </Grid>
    );
  };

  return (
    <BrowserRouter basename="/wen-kai">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Helmet>
            <title>Wen Kai — Software Engineer</title>
            <meta name="description" content="Wen Kai's personal portfolio — Software Engineer, competitive programmer, and avid reader." />
            <link rel="icon" type="image/png" href={favicon} sizes="96x96" />
          </Helmet>

          <HeaderBar handleTabChange={handleTabChange} tabValue={tabValue} />

          <Grid container className={classes.contentContainer}>
            <Routes>
              <Route exact path={"/"} element={<About />} />
              <Route exact path={"/cp"} element={<CP />} />
              <Route exact path={"/books"} element={<Books />} />
              <Route exact path={"/contact"} element={<Contact />} />

              <Route path="/404" element={errorPage()} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </Grid>

          <FooterBar />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
