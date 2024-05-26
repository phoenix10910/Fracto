import React, {useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../../style/User/DoctorSelect.css';
import Button from '@mui/material/Button';




const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'specialization',
    label: 'Specialization',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function DoctorSelect() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedfilter, setSelectedfilter] = useState("");
  const [doctorRecords, setDoctorRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [check,setCheck] = useState(0);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const cities = ["Lucknow", "Noida", "Mumbai", "Bangalore", "Chennai"];
  const specialities = ["Dentist", "Gynecologist", "General Physician", "Dermatologist", "ENT Specialist"];
  const filter = ["According To Rating"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCheck(1);
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

 const first= () =>{
    fetch('http://localhost:8081/user/displayDoctors/')
    .then((response) => response.json())
    .then((data) => setDoctorRecords(data))
    .catch((error) => console.log(error));
 };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSpecialityChange = (event) => {
    setSelectedSpeciality(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedfilter(event.target.value);
  };

  const handleSubmit =() =>{
      if(selectedDate)
      {
        setCheck(1);
      }
      else
      {
        setCheck(2);
      }
  };

  const handleSearch = () => {
    if(!selectedfilter){
    if (!selectedCity) {
        fetch('http://localhost:8081/user/displayDoctors/')
      .then((response) => response.json())
      .then((data) => setDoctorRecords(data))
      .catch((error) => console.log(error));
    }
    else if(!selectedSpeciality)
    {
        fetch('http://localhost:8081/user/getDoctorsByLocation/'+selectedCity)
      .then((response) => response.json())
      .then((data) => setDoctorRecords(data))
      .catch((error) => console.log(error));            
    }
    // Fetch doctor records that match selected city and speciality
    else{
    fetch('http://localhost:8081/user/getDoctorsByLocationAndSpecs/'+selectedCity+'/'+selectedSpeciality)
      .then((response) => response.json())
      .then((data) => setDoctorRecords(data))
      .catch((error) => console.log(error));
    }
    }
    else{
        if (!selectedCity) {
            fetch('http://localhost:8081/user/getDoctorsRating/')
          .then((response) => response.json())
          .then((data) => setDoctorRecords(data))
          .catch((error) => console.log(error));
        }
        else if(!selectedSpeciality)
        {
            fetch('http://localhost:8081/user/getDoctorsByLocationRating/'+selectedCity)
          .then((response) => response.json())
          .then((data) => setDoctorRecords(data))
          .catch((error) => console.log(error));            
        }
        // Fetch doctor records that match selected city and speciality
        else{
        fetch('http://localhost:8081/user/getDoctorsByLocationAndSpecsRating/'+selectedCity+'/'+selectedSpeciality)
          .then((response) => response.json())
          .then((data) => setDoctorRecords(data))
          .catch((error) => console.log(error));
        }   
    }
  };

  useEffect(() => {
    first();
  },[])

  return (
    <div className="display1">
      <div className='search'>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
      <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedCity}
          onChange={handleCityChange}
          label="City"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities.map(city =>(
            <MenuItem value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-standard-label">Speciality</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedSpeciality}
          onChange={handleSpecialityChange}
          label="Speciality"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {specialities.map(speciality =>(
            <MenuItem value={speciality}>{speciality}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
      <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedfilter}
          onChange={handleFilterChange}
          label="Filter"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filter.map(filters =>(
            <MenuItem value={filters}>{filters}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <label>
        <DatePicker className='datepicker' popperPlacement="bottom" sx={{overflow:'hidden'}} selected={selectedDate} placeholderText="Enter A Date:" onSelect={handleDateChange} align="right" />
        </label><br></br><br></br>
        {check===2 && (
      <div>
        <h2 style={{color:'darkblue'}}>
          Enter Date
        </h2>
      </div>
      )}
    <Button variant="contained" onClick={handleSearch}>Search</Button><br></br><br></br>
    </div>
    <Paper sx={{ width: '85%' }} className='table2'>
    <TableContainer sx={{ maxHeight: 515 }}>
    <Table stickyHeader aria-label="sticky table" className="table">
    <TableHead>
    <TableRow >
              {columns.map((column) => (
                <TableCell className="tablecell"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:'darkblue', color:'white'}}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Book</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorRecords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => {
                return (
                  <TableRow className="tablebodyrow" hover role="checkbox" tabIndex={-1} key={doctor.name}>
                    {columns.map((column) => {
                      const value = doctor[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}                          
                        </TableCell>
                      );
                    })}
                    <button onClick={handleSubmit}>< NavLink style={{pointerEvents: selectedDate ? '' : 'none'}} to="/appointment"  state={{name:doctor.name,date:formatDate(selectedDate)}}>Book</NavLink ></button>
                  </TableRow>
                );
              })}
          </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25, 50, 100 , doctorRecords.length]}
        component="div"
        count={doctorRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  </div>
);
}

export default DoctorSelect;
