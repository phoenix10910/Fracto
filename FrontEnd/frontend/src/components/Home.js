import React from 'react'
import '../style/Home.css';
import RegisterUser from './User/RegisterUser';
import RegisterAdmin from './Admin/RegisterAdmin';
import LoginUser from './User/LoginUser';
import LoginAdmin from './Admin/LoginAdmin';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import imagebackground from '../images/Hospital_Background.webp';
import logo from '../images/fracto_logo1.png';

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

function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container1" style={{backgroundImage:`url(${imagebackground})`,
    backgroundRepeat:'no-repeat',backgroundSize:"cover" ,
    width:1535,height:720,position:'fixed'}}>
      
    <Box sx={{ width: '50%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login As User" {...a11yProps(0)} />
          <Tab label="Login As Admin" {...a11yProps(1)} />
          <Tab label="Register As User" {...a11yProps(2)} />
          <Tab label="Register As Admin" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <img className='image1' src={logo} alt='none'></img>
      <Box className="text-box1">
      
      <TabPanel value={value} index={0}>
        <LoginUser></LoginUser>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LoginAdmin></LoginAdmin>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RegisterUser></RegisterUser>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RegisterAdmin></RegisterAdmin>
      </TabPanel>
      
      </Box>
    </Box>
    </div>
  );
}

export default Home;
