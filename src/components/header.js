import {
  makeStyles,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  ChromeReaderMode,
  ContactMail,
  Person,
  Timeline,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
    width: "100%",
    background: "rgba(10, 15, 26, 0.8)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    transition: "all 0.3s ease",
  },
  logo: {
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    cursor: "pointer",
    textDecoration: "none",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 0.8,
    },
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  navLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    padding: "8px 18px",
    borderRadius: 8,
    transition: "all 0.3s ease",
    position: "relative",
    letterSpacing: "0.3px",
    "&:hover": {
      color: "#e2e8f0",
      backgroundColor: "rgba(56, 189, 248, 0.08)",
    },
  },
  navLinkActive: {
    color: "#38bdf8",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 2,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: 2,
      backgroundColor: "#38bdf8",
      borderRadius: 1,
    },
  },
  hamburgerBtn: {
    color: "#94a3b8",
    "&:hover": {
      color: "#38bdf8",
    },
  },
  drawer: {
    "& .MuiDrawer-paper": {
      width: 280,
      backgroundColor: "#111827",
      borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
      paddingTop: 20,
    },
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px 20px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
  drawerItem: {
    padding: "14px 24px",
    borderRadius: 8,
    margin: "4px 12px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(56, 189, 248, 0.08)",
    },
  },
  drawerItemActive: {
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    "& .MuiListItemText-primary": {
      color: "#38bdf8",
    },
    "& .MuiListItemIcon-root": {
      color: "#38bdf8",
    },
  },
  drawerIcon: {
    color: "#94a3b8",
    minWidth: 40,
  },
  drawerText: {
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      fontSize: 15,
      color: "#e2e8f0",
    },
  },
}));

const navItems = [
  { label: "About", icon: <Person />, path: "/", index: 0 },
  { label: "Competitive Programming", icon: <Timeline />, path: "/cp", index: 1 },
  { label: "Books", icon: <ChromeReaderMode />, path: "/books", index: 2 },
  { label: "Contact", icon: <ContactMail />, path: "/contact", index: 3 },
];

const HeaderBar = (props) => {
  const classes = useStyles();
  const { handleTabChange } = props;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/wen-kai" || location.pathname === "/wen-kai/" || location.pathname === "/";
    return location.pathname.endsWith(path);
  };

  const renderDesktopNav = () => (
    <div className={classes.navLinks}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`${classes.navLink} ${isActive(item.path) ? classes.navLinkActive : ""}`}
          onClick={(e) => handleTabChange(e, item.index)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  const renderMobileDrawer = () => (
    <>
      <IconButton
        className={classes.hamburgerBtn}
        onClick={() => setDrawerOpen(true)}
        aria-label="menu"
      >
        <MenuIcon style={{ fontSize: 28 }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className={classes.drawer}
      >
        <div className={classes.drawerHeader}>
          <Typography className={classes.logo} style={{ fontSize: 18 }}>
            Wen Kai
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            style={{ color: "#94a3b8" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <List style={{ marginTop: 8 }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{ color: "inherit", textDecoration: "none" }}
              onClick={(e) => {
                setDrawerOpen(false);
                handleTabChange(e, item.index);
              }}
            >
              <ListItem
                button
                className={`${classes.drawerItem} ${
                  isActive(item.path) ? classes.drawerItemActive : ""
                }`}
              >
                <ListItemIcon className={classes.drawerIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  className={classes.drawerText}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );

  return (
    <nav className={classes.navbar}>
      <Link to="/" className={classes.logo} onClick={(e) => handleTabChange(e, 0)}>
        Wen Kai
      </Link>
      {isMobile ? renderMobileDrawer() : renderDesktopNav()}
    </nav>
  );
};

export default HeaderBar;
