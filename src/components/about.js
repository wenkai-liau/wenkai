import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ChromeReaderMode,
  Computer,
  Image,
  LocalCafe,
  Pool,
  Timeline,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BasicTable from "./basicTable";
import { ReactComponent as ReactLogo } from "../svg/react_logo.svg";
import { ReactComponent as SpringLogo } from "../svg/spring_logo.svg";
import { ReactComponent as FlaskLogo } from "../svg/flask_logo.svg";
import { ReactComponent as MySqlLogo } from "../svg/mysql_logo.svg";
import { ReactComponent as Neo4JLogo } from "../svg/neo4j_logo.svg";
import { ReactComponent as ESLogo } from "../svg/elastic_logo.svg";
import { ReactComponent as DockerLogo } from "../svg/docker_logo.svg";
import { ReactComponent as GitLogo } from "../svg/git_logo.svg";
import { ReactComponent as FedoraLogo } from "../svg/fedora_logo.svg";
import { ReactComponent as CentOSLogo } from "../svg/centos_logo.svg";
import { ReactComponent as NifiLogo } from "../svg/nifi_logo.svg";
import { ReactComponent as SeleniumLogo } from "../svg/selenium_logo.svg";
import { ReactComponent as GradleLogo } from "../svg/gradle_logo.svg";
import { ReactComponent as HtmlLogo } from "../svg/html.svg";
import { ReactComponent as CssLogo } from "../svg/css.svg";
import { ReactComponent as MaterialLogo } from "../svg/material.svg";
import memeOne from "./doge.png";
import memeTwo from "./trollface.png";
import memeThree from "./feelsguy.png";
import memeFour from "./monkas.png";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AutoSlider from "../common/autoSlider";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imgContainer: {
    display: "flex",
    height: 400,
    justifyContent: "center",
  },
  contentContainer: {
    padding: "1% 5%",
  },
  aboutMeContainer: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      marginTop: 15,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 25,
    },
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
}));

const About = (props) => {
  const classes = useStyles();
  //   const {tabValue, handleTabChange} = props

  const createText = (text, icon) => {
    return (
      <Grid container align="center">
        <ListItemIcon style={{ marginTop: 3 }}>{icon}</ListItemIcon>
        <Typography item variant="h6">
          {text}
        </Typography>
      </Grid>
    );
  };

  const renderLanguageTable = () => {
    return <BasicTable />;
  };

  const reactFrameworkRow = (logoComponent, text) => {
    return (
      <Grid container item style={{ height: 100, flexDirection: "column" }}>
        <Grid>{logoComponent}</Grid>
        {text !== "" && <Grid style={{ textAlign: "center" }}>{text}</Grid>}
      </Grid>
    );
  };

  const renderFrameWorks = () => {
    return (
      <Grid
        container
        justify="center"
        align="center"
        className={classes.subContentContainer}
      >
        <Typography item variant="h4" justify="center" align="center">
          Frameworks and Databases
        </Typography>
        <Grid container style={{ flexDirection: "row" }}>
          <Grid
            container
            item
            style={{
              width: "50%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {reactFrameworkRow(
              <ReactLogo
                className={classes.logoStyle}
                style={{ margin: 0, width: 70, height: 70 }}
              />,
              "React JS"
            )}
            {reactFrameworkRow(
              <ReactLogo
                className={classes.logoStyle}
                style={{ marginBottom: 0, width: 70, height: 70 }}
              />,
              "React TS"
            )}
            {reactFrameworkRow(
              <SpringLogo
                className={classes.logoStyle}
                style={{ marginTop: 15 }}
              />,
              "Spring"
            )}
            {reactFrameworkRow(
              <FlaskLogo
                className={classes.logoStyle}
                style={{ marginTop: 15, width: 60, height: 60 }}
              />,
              ""
            )}
          </Grid>

          <Grid
            container
            item
            style={{
              width: "50%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {reactFrameworkRow(<MySqlLogo style={{ marginTop: 10 }} />, " ")}
            {reactFrameworkRow(<Neo4JLogo style={{ marginTop: 10 }} />, "")}
            {reactFrameworkRow(
              <ESLogo style={{ height: 50, width: 50, marginTop: 15 }} />,
              "Elasticsearch"
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderOthers = () => {
    return (
      <Grid
        container
        justify="center"
        align="center"
        className={classes.othersContainer}
      >
        <Typography item variant="h4" justify="center" align="center">
          Tools and Others
        </Typography>
        <Grid container style={{ flexDirection: "row" }}>
          <Grid
            container
            item
            style={{
              width: "50%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {reactFrameworkRow(
              <DockerLogo
                className={classes.logoStyle}
                style={{ margin: 0, width: 70, height: 70 }}
              />,
              "Docker"
            )}
            {reactFrameworkRow(
              <GitLogo
                className={classes.logoStyle}
                style={{ marginBottom: 0, width: 70, height: 70 }}
              />,
              "Git"
            )}
            {reactFrameworkRow(<NifiLogo style={{ marginTop: 10 }} />, "")}
            {reactFrameworkRow(
              <SeleniumLogo style={{ height: 50, width: 50, marginTop: 15 }} />,
              "Selenium"
            )}
            {reactFrameworkRow(
              <GradleLogo style={{ height: 50, width: 50, marginTop: 15 }} />,
              "Gradle"
            )}
          </Grid>

          <Grid
            container
            item
            style={{
              width: "50%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {reactFrameworkRow(<CentOSLogo style={{ marginTop: 10 }} />, "")}
            {reactFrameworkRow(
              <FedoraLogo
                className={classes.logoStyle}
                style={{ marginTop: 15, width: 100, height: 100 }}
              />,
              ""
            )}
            {reactFrameworkRow(
              <HtmlLogo style={{ marginTop: 10, width: 60, height: 60 }} />,
              ""
            )}
            {reactFrameworkRow(
              <CssLogo style={{ marginTop: 10, width: 60, height: 60 }} />,
              ""
            )}
            {reactFrameworkRow(
              <MaterialLogo style={{ height: 50, width: 50, marginTop: 15 }} />,
              "Material"
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const [memeSel, setMemeSel] = useState(0);
  const memes = [memeOne, memeTwo, memeThree, memeFour];

  const memeClick = (e) => {
    setMemeSel((prevState) => (prevState + 1) % memes.length);
  };

  const renderMeme = () => {
    return (
      <img
        onClick={memeClick}
        item
        src={memes[memeSel]}
        width={25}
        height={25}
        style={{ alignSelf: "center" }}
      />
    );
  };

  const renderAboutMe = () => {
    return (
      <Grid item className={classes.aboutMeContainer}>
        <Typography
          item
          variant="h3"
          style={{ textAlign: "center", marginBottom: 15 }}
        >
          About Me
        </Typography>
        <Grid
          container
          align="center"
          justify="center"
          style={{ flexDirection: "column" }}
        >
          <Typography item variant="h5" style={{ textAlign: "center" }}>
            Hello! I am Wen Kai, a Software Engineer working in Tech Industry
          </Typography>

          <Grid item container justify="center">
            <List item style={{ justifyContent: "center" }}>
              <ListItem>
                <Typography item variant="h5" style={{ textAlign: "center" }}>
                  My Interests are
                </Typography>
              </ListItem>
              <ListItem>{createText("Reading", <ChromeReaderMode />)}</ListItem>
              <ListItem>
                {createText(
                  "Software Development",
                  <Computer style={{ color: "#C0C0C0" }} />
                )}
              </ListItem>
              <ListItem>
                {createText(
                  "Competitive Programming",
                  <Timeline style={{ color: "990F02" }} />
                )}
              </ListItem>
              <ListItem>
                {createText("Swimming", <Pool style={{ color: "blue" }} />)}
              </ListItem>
              <ListItem>
                {createText(
                  "Drinking Tea",
                  <LocalCafe style={{ color: "#923c01" }} />
                )}
              </ListItem>
              <ListItem>{createText("Memes", renderMeme())}</ListItem>
            </List>
          </Grid>

          <Typography item variant="body1" style={{ textAlign: "center" }}>
            On this site, I hope to share resources and information.
            <br />I will also be using the site to track my progress and
            learning journey.
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <div container className={classes.container}>
      <Grid item className={classes.imgContainer}>
        {AutoSlider(useWindowDimensions())}
      </Grid>

      <Grid item className={classes.contentContainer}>
        {renderAboutMe()}
        {renderLanguageTable()}
        {renderFrameWorks()}
        {renderOthers()}
      </Grid>
    </div>
  );
};

export default About;
