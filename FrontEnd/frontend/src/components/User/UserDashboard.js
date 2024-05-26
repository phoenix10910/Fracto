import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoctorSelect from './UserDashboardComponents/DoctorSelect';
import AppointmentHistory from './UserDashboardComponents/AppointmentHistory';
import { NavLink } from 'react-router-dom';
import logo from '../../images/fracto_logo1.png';


function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UserDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '83%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Book Doctor" {...a11yProps(0)} />
          <Tab label="Appointment History" {...a11yProps(1)} />
        </Tabs>
        <img className='image1' src={logo} alt='none'></img>
        <button type="submit" className='button3'><NavLink className="navlink1" to='/'>Logout</NavLink></button>
      </Box>
      <TabPanel value={value} index={0}>
        <DoctorSelect></DoctorSelect>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AppointmentHistory></AppointmentHistory>
      </TabPanel>
    </Box>
  );
}

export default UserDashboard