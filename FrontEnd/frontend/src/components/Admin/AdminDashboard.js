import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../style/Admin/AdminDashboard.css';
import DisplayDoctor from './AdminDashboardComponents/DisplayDoctor';
import AddDoctor from './AdminDashboardComponents/AddDoctor';
import UserDisplay from './AdminDashboardComponents/UserDisplay';
import ApproveAppointment from './AdminDashboardComponents/ApproveAppointment';
import Appointments from './AdminDashboardComponents/Appointments';
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

function AdminDashboard() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Box sx={{ width: '83%' }} className='box'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab className='tab' label="Display Doctor" {...a11yProps(0)} />
        <Tab  label="Add Doctor" {...a11yProps(1)} />
        <Tab  label="Display User" {...a11yProps(2)} />
        <Tab  label="Pending Appointments" {...a11yProps(3)} />
        <Tab  label="Appointments" {...a11yProps(4)} />
        
      </Tabs>
      <img className='image1' src={logo} alt='none'></img>
      <button type="submit" className='button3'><NavLink className="navlink1" to='/'>Logout</NavLink></button>
      </Box>
      <TabPanel value={value} index={0}>
        <DisplayDoctor/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddDoctor/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserDisplay/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ApproveAppointment/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Appointments/>
      </TabPanel>
    </Box>
   
    </div>
  );
}

export default AdminDashboard