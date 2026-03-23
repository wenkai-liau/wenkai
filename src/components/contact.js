import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import image from "../images/marina.jpg";
import { GitHub, LinkedIn, MenuBook, TrendingUp } from "@material-ui/icons";
import leetcode from "../images/leetcode.png";
import codeforces from "../images/codeforces.png";
import { openInNewTab } from "../common/common";
import atcoder from "../images/atcoder.svg";

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
    padding: "40px 5%",
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 40,
    fontWeight: 700,
    background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  linksGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  linkCard: {
    background: "rgba(17, 24, 39, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: 110,
    "&:hover": {
      border: "1px solid rgba(56, 189, 248, 0.3)",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(56, 189, 248, 0.12)",
      "& $linkIcon": {
        color: "#38bdf8",
      },
    },
  },
  linkIcon: {
    color: "#94a3b8",
    transition: "color 0.3s ease",
  },
  linkLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center",
  },
}));

const Contact = () => {
  const classes = useStyles();

  const links = [
    {
      label: "GitHub",
      icon: <GitHub style={{ fontSize: 32 }} />,
      url: "https://github.com/wenkai-liau",
    },
    {
      label: "LinkedIn",
      icon: <LinkedIn style={{ fontSize: 32, color: "#0A66C2" }} />,
      url: "https://linkedin.com/in/wen-kai",
    },
    {
      label: "LeetCode",
      icon: <img src={leetcode} width={32} height={32} alt="LeetCode" />,
      url: "https://leetcode.com/Lwenkai/",
    },
    {
      label: "Codeforces",
      icon: <img src={codeforces} width={32} height={32} alt="Codeforces" />,
      url: "https://codeforces.com/profile/lwenkai",
    },
    {
      label: "AtCoder",
      icon: <img src={atcoder} width={32} height={32} alt="AtCoder" />,
      url: "https://atcoder.jp/users/kaicoder0",
    },
    {
      label: "Storygraph",
      icon: <MenuBook style={{ fontSize: 32 }} />,
      url: "https://app.thestorygraph.com/profile/lwenkai",
    },
    {
      label: "CLIST",
      icon: <TrendingUp style={{ fontSize: 32 }} />,
      url: "https://clist.by/coder/lwkclist/",
    },
  ];

  return (
    <div className={classes.container}>
      {/* Hero */}
      <div className={classes.heroWrapper}>
        <img src={image} alt="Contact" className={classes.heroImage} />
        <div className={classes.heroOverlay} />
        <div className={classes.heroGradient} />
        <div className={classes.heroTextOverlay}>
          <Typography className={classes.heroTitle}>Get in Touch</Typography>
        </div>
      </div>

      <div className={classes.contentContainer}>
        <Typography variant="h4" className={classes.sectionTitle}>
          Find Me Online
        </Typography>

        <div className={classes.linksGrid}>
          {links.map((link, idx) => (
            <div
              key={idx}
              className={classes.linkCard}
              onClick={() => openInNewTab(link.url)}
            >
              <div className={classes.linkIcon}>{link.icon}</div>
              <span className={classes.linkLabel}>{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
