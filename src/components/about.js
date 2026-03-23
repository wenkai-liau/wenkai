import {
  Grid,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ChromeReaderMode,
  Computer,
  LocalCafe,
  Pool,
  Timeline,
} from "@material-ui/icons";
import React, { useState } from "react";
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
    backgroundColor: "#0a0f1a",
  },
  heroWrapper: {
    position: "relative",
    width: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
    pointerEvents: "none",
  },
  heroTitle: {
    fontWeight: 800,
    color: "#fff",
    textShadow: "0 4px 30px rgba(0,0,0,0.6)",
    letterSpacing: "-1px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.2rem",
    },
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: 400,
    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
    marginTop: 8,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
  },
  contentContainer: {
    padding: "0 5%",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 700,
    background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  aboutMeContainer: {
    flexDirection: "column",
    marginTop: 40,
    padding: "40px 0",
  },
  interestCard: {
    background: "rgba(17, 24, 39, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    padding: "12px 20px",
    margin: "6px 0",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid rgba(56, 189, 248, 0.2)",
      backgroundColor: "rgba(56, 189, 248, 0.05)",
      transform: "translateX(8px)",
    },
  },
  interestIcon: {
    minWidth: 40,
    color: "#38bdf8",
  },
  interestText: {
    color: "#e2e8f0",
    fontWeight: 500,
    fontSize: 16,
  },
  introText: {
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 1.7,
    fontSize: 16,
    maxWidth: 600,
    margin: "0 auto",
  },
  // Frameworks & Tools
  techSection: {
    marginTop: 60,
    padding: "40px 0",
  },
  techGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  techCard: {
    background: "rgba(17, 24, 39, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid rgba(56, 189, 248, 0.3)",
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px rgba(56, 189, 248, 0.1)",
    },
  },
  techLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: 500,
    marginTop: 6,
    textAlign: "center",
  },
  logoStyle: {
    height: 40,
    width: 40,
  },
  missionText: {
    color: "#64748b",
    textAlign: "center",
    lineHeight: 1.8,
    fontSize: 14,
    marginTop: 20,
    maxWidth: 500,
    margin: "20px auto 0",
  },
}));

const About = () => {
  const classes = useStyles();
  const [memeSel, setMemeSel] = useState(0);
  const memes = [memeOne, memeTwo, memeThree, memeFour];
  const memeClick = () => setMemeSel((prev) => (prev + 1) % memes.length);

  const interests = [
    { text: "Reading", icon: <ChromeReaderMode />, color: "#38bdf8" },
    { text: "Software Development", icon: <Computer />, color: "#a78bfa" },
    { text: "Competitive Programming", icon: <Timeline />, color: "#f472b6" },
    { text: "Swimming", icon: <Pool />, color: "#22d3ee" },
    { text: "Drinking Tea", icon: <LocalCafe />, color: "#fbbf24" },
    {
      text: "Memes",
      icon: (
        <img
          onClick={memeClick}
          src={memes[memeSel]}
          width={24}
          height={24}
          alt="meme"
          style={{ cursor: "pointer" }}
        />
      ),
      color: "#34d399",
    },
  ];

  const techItems = [
    { logo: <ReactLogo className={classes.logoStyle} />, label: "React" },
    { logo: <SpringLogo className={classes.logoStyle} />, label: "Spring" },
    { logo: <FlaskLogo className={classes.logoStyle} style={{ width: 50, height: 50 }} />, label: "Flask" },
    { logo: <MySqlLogo style={{ width: 60, height: 40 }} />, label: "MySQL" },
    { logo: <Neo4JLogo style={{ width: 60, height: 40 }} />, label: "Neo4j" },
    { logo: <ESLogo className={classes.logoStyle} />, label: "Elastic" },
  ];

  const toolItems = [
    { logo: <DockerLogo className={classes.logoStyle} style={{ width: 50, height: 50 }} />, label: "Docker" },
    { logo: <GitLogo className={classes.logoStyle} style={{ width: 50, height: 50 }} />, label: "Git" },
    { logo: <NifiLogo style={{ width: 50, height: 40 }} />, label: "NiFi" },
    { logo: <SeleniumLogo className={classes.logoStyle} />, label: "Selenium" },
    { logo: <GradleLogo className={classes.logoStyle} />, label: "Gradle" },
    { logo: <HtmlLogo style={{ width: 40, height: 40 }} />, label: "HTML" },
    { logo: <CssLogo style={{ width: 40, height: 40 }} />, label: "CSS" },
    { logo: <MaterialLogo className={classes.logoStyle} />, label: "Material" },
    { logo: <CentOSLogo style={{ width: 50, height: 40 }} />, label: "CentOS" },
    { logo: <FedoraLogo className={classes.logoStyle} style={{ width: 50, height: 50 }} />, label: "Fedora" },
  ];

  const renderTechGrid = (items) => (
    <div className={classes.techGrid}>
      {items.map((item, idx) => (
        <div key={idx} className={classes.techCard}>
          {item.logo}
          <span className={classes.techLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes.container}>
      {/* Hero with slider + text overlay */}
      <div className={classes.heroWrapper}>
        <AutoSlider {...useWindowDimensions()} />
        <div className={classes.heroOverlay}>
          <Typography className={classes.heroTitle}>
            Hello, I'm Wen Kai
          </Typography>
          <Typography className={classes.heroSubtitle}>
            Software Engineer · Competitive Programmer · Reader
          </Typography>
        </div>
      </div>

      <div className={classes.contentContainer}>
        {/* About Me */}
        <Grid item className={classes.aboutMeContainer}>
          <Typography variant="h4" className={classes.sectionTitle}>
            About Me
          </Typography>
          <Typography className={classes.introText}>
            I'm a Software Engineer working in the Tech Industry, passionate about
            building software and solving algorithmic challenges.
          </Typography>

          <Grid
            container
            justify="center"
            style={{ marginTop: 30, maxWidth: 500, margin: "30px auto 0" }}
          >
            {interests.map((item, idx) => (
              <div key={idx} className={classes.interestCard}>
                <ListItemIcon className={classes.interestIcon} style={{ color: item.color }}>
                  {item.icon}
                </ListItemIcon>
                <Typography className={classes.interestText}>
                  {item.text}
                </Typography>
              </div>
            ))}
          </Grid>

          <Typography className={classes.missionText}>
            On this site, I share resources, information, and track my progress
            and learning journey.
          </Typography>
        </Grid>

        {/* Programming Languages */}
        <BasicTable />

        {/* Frameworks & Databases */}
        <div className={classes.techSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Frameworks & Databases
          </Typography>
          {renderTechGrid(techItems)}
        </div>

        {/* Tools */}
        <div className={classes.techSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Tools & Others
          </Typography>
          {renderTechGrid(toolItems)}
        </div>
      </div>
    </div>
  );
};

export default About;
