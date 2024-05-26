import React,{useState,useEffect} from 'react';
import '../../../style/Admin/DisplayDoctor.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Name', minWidth: 120 },
  {
    id: 'city',
    label: 'City',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'specialization',
    label: 'Specialization',
    minWidth: 120,
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

function DisplayDoctor() {
  const [data,setData]=useState([]);
  const [page, setPage] = React.useState(0);
  const [deletevalue,setDeletevalue] =useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    const doctorname=event.target.value;
    const response = await fetch('http://localhost:8082/admin/deleteDoctor/'+doctorname, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctorname
      })
    });

    if (response.ok) {
      setDeletevalue(1);
      getData();
    } else {
      setDeletevalue(2);
    }
  };

  const getData=()=>{
    fetch('http://localhost:8082/admin/displayDoctor'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <form onSubmit={getData} className='form5'>
      
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500}}>
        <Table stickyHeader aria-label="sticky table">
         <TableHead >
         <TableRow className='tablecell1'>
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: 'darkblue',color:'white' }}
                >
                  {column.label}
                </TableCell>
                
              ))}
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Remove</TableCell>
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doc) => {
                return (
                  <TableRow className='tablebodyrow2' hover role="checkbox" tabIndex={-1} key={doc.name}>
                    {columns.map((column) => {
                      const value = doc[column.id];
                      return (
                        <TableCell  key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}                          
                        </TableCell>
                      );                    
                    })}             
                    <TableCell><button value={doc.name} onClick={handleRemove}>Remove</button></TableCell>
                    <TableCell><button>< NavLink to="/updateDoctor"  state={{name:doc.name,city:doc.city,specialization:doc.specialization,rating:doc.rating}}>Update</NavLink ></button></TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25, 50, 100 , data.length]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Paper>      
      {deletevalue===2 && (
      <div>
        <h2>
          Something went Wrong
        </h2>
      </div>
      )}
    </form>
  );
}

export default DisplayDoctor;