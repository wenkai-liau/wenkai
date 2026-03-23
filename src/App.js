import {
  createTheme,
  Grid,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";
import HeaderBar from "./components/header";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./components/about";
import FooterBar from "./components/footerBar";
import Books from "./components/books";
import pikachu from "./images/pikachu_meme.png";
import { Helmet } from "react-helmet";
import favicon from "./favicon.ico";
import error_page from "./images/doge_error.png";
import CP from "./components/Cp/cp";
import Contact from "./components/contact";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    // width: "99vw",
  },
  contentContainer: {
    minHeight: "87%",
  },
  errorImageStyle: {
    alignSelf: "center",
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

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const wip = () => {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ flexDirection: "column", height: "85vh", width: "100%" }}
      >
        <img
          src={pikachu}
          width={385}
          height={314}
          style={{ alignSelf: "center" }}
        />
        <Typography variant="h3">Work in Progress</Typography>
      </Grid>
    );
  };

  const errorPage = () => {
    return (
      <Grid item container className={classes.errorPageStyle}>
        <img src={error_page} className={classes.errorImageStyle} />
      </Grid>
    );
  };

  return (
    <BrowserRouter basename="/wen-kai">
      <div className={classes.root}>
        <Helmet>
          <title>Wen Kai Site</title>
          <meta name="description" content="Helmet application" />
          <link rel="icon" type="image/png" href={favicon} sizes="96x96" />
        </Helmet>

        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
