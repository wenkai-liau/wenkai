import { Grid, makeStyles, Tab, Tabs, Tooltip, Typography, } from '@material-ui/core';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grid>
            {children}
          </Grid>
        )}
      </div>
    );
  }


export default TabPanel;
