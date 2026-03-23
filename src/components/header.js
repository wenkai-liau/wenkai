import {
  Grid,
  makeStyles,
  Select,
  Tab,
  Tabs,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import moment from "moment";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { slide as Menu } from "react-burger-menu";
import {
  ChromeReaderMode,
  ContactMail,
  MenuOpen,
  MenuOutlined,
  Person,
  Timeline,
} from "@material-ui/icons";

let styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "120px",
    height: "70px",
    right: "10px",
    top: "10px",
  },
  bmBurgerBars: {
    background: "#2155CD",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    overflow: "hidden",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
    width: "100%",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: "5%",
    width: "100%",
    display: "flex",
  },
  tabStyles: {
    fontWeight: 30,
    fontFamily: '" "Courier New", monospace',
    "&:hover": {
      color: "#213ED2",
      textShadow: "-.25px -.25px 0 black,  .25px .25px black;",
    },
  },
  clockContainer: {
    width: "30%",
  },
  clockStyle: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    height: "50%",
    [theme.breakpoints.down("xs")]: {
      margin: "0% 5%",
      fontSize: 14,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0% 5%",
      fontSize: 22,
      width: 130,
    },
  },
  menuItemStyle: {
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  "@keyframes color": {
    "0%": {
      color: "#A5DEF2",
    },
    "25%": {
      color: "#00E8FF",
    },
    "50%": {
      color: "#5BAEB7",
    },
    "75%": {
      color: "#1E80C1",
    },
    "100%": {
      color: "#414C6B",
    },
  },
  customBurgerIcon: {
    animation: "$color 4s infinite",
    // width: 200,
    // height: 200,
  },
}));

const HeaderBar = (props) => {
  const classes = useStyles();
  const { tabValue, handleTabChange } = props;

  const allTimezones = moment.tz.names();
  let someTimezones = [
    "Africa/Abidjan",
    "Europe/Berlin",
    "Europe/Zurich",
    "Asia/Tel_Aviv",
    "Japan",
    "America/Vancouver",
    "Turkey",
    "Europe/Moscow",
    "Europe/Paris",
    "Asia/Singapore",
  ];
  someTimezones.sort();

  const [timezoneOne, setTimezoneOne] = useState(moment.tz.guess());
  const [timezoneTwo, setTimezoneTwo] = useState("Africa/Abidjan");

  const { height, width } = useWindowDimensions();
  const phoneScreen = width < 800 ? true : false;

  const handleChangeOne = (event) => {
    setTimezoneOne(event.target.value);
  };

  const handleChangeTwo = (event) => {
    setTimezoneTwo(event.target.value);
  };

  const renderClock = () => {
    return (
      <Grid item container className={classes.clockContainer}>
        <Grid item container style={{ alignItems: "center" }}>
          <Clock
            item
            format={"h:mm:ss A"}
            ticking={true}
            timezone={timezoneOne}
            className={classes.clockStyle}
          />
          <FormControl>
            <Select
              item
              labelId="tz-one-label"
              id="tz-one"
              value={timezoneOne}
              label="TZ"
              onChange={handleChangeOne}
            >
              {allTimezones.map((tz) => (
                <MenuItem value={tz}>{tz}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {width > 1000 && (
          <Grid item container style={{ alignItems: "center" }}>
            <Clock
              item
              format={"h:mm:ss A"}
              ticking={true}
              timezone={timezoneTwo}
              className={classes.clockStyle}
            />
            <FormControl>
              <Select
                item
                labelId="tz-two-label"
                id="tz-two"
                value={timezoneTwo}
                label="TZ"
                onChange={handleChangeTwo}
              >
                {someTimezones.map((tz) => (
                  <MenuItem value={tz}>{tz}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderHamburgerItem = (text, icon, link, tabIndex) => {
    const marginVertical = phoneScreen ? "25% 0%" : "10% 0%";
    return (
      <Link
        to={link}
        style={{ color: "inherit", textDecoration: "inherit" }}
        onClick={(e) => {
          closeMenu();
          handleTabChange(e, tabIndex);
        }}
      >
        <Grid
          item
          container
          id={text}
          className={classes.menuItemStyle}
          style={{
            alignItems: "center",
            display: "flex",
            margin: marginVertical,
            color: tabIndex === tabValue && "white",
          }}
        >
          {icon}
          <Typography variant="h5" style={{ textAlign: "left" }}>
            {text}
          </Typography>
        </Grid>
      </Link>
    );
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const customBurgerIcon = (
    <MenuOutlined className={classes.customBurgerIcon} />
  );

  // https://www.npmjs.com/package/react-burger-menu
  return (
    <Grid container align="center" className={classes.container}>
      <Menu
        customBurgerIcon={customBurgerIcon}
        isOpen={menuOpen}
        onStateChange={() => handleStateChange()}
        right
        styles={styles}
        width={phoneScreen ? 200 : 300}
      >
        {renderHamburgerItem(
          "About",
          <Person style={{ fontSize: "2em", marginRight: "5%" }} />,
          "/",
          0
        )}
        {renderHamburgerItem(
          "CP",
          <Timeline style={{ fontSize: "2em", marginRight: "5%" }} />,
          "/cp",
          1
        )}
        {renderHamburgerItem(
          "Books",
          <ChromeReaderMode style={{ fontSize: "2em", marginRight: "5%" }} />,
          "/books",
          2
        )}
        {renderHamburgerItem(
          "Contact",
          <ContactMail style={{ fontSize: "2em", marginRight: "5%" }} />,
          "contact",
          3
        )}
      </Menu>

      {/* {renderTabs()} */}
    </Grid>
  );
};

export default HeaderBar;
