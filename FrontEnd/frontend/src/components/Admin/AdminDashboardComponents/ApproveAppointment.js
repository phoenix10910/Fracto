import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../../../style/Admin/ApproveAppointment.css';

const columns = [
  { id: 'username', label: 'User Name', minWidth: 120 },

  {
    id: 'doctorname',
    label: 'Doctor Name',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'timings',
    label: 'Time',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function ApproveAppointment() {
  const [data,setData]=useState([]);
  const [id,setId]=useState(0);
  const [check,setCheck] =useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData=()=>{
    fetch('http://localhost:8082/admin/getAppointmentByStatus'
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
  const handleapprove = async (event) => {
    setId(event.target.value);

    const response = await fetch('http://localhost:8082/admin/approveAppointment/'+event.target.value, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       id 
      })
    });

    if (response.ok) {
      setCheck(1);
      setId(0);
    } else {
      setCheck(2);
    }
  };
  const handledelete = async (event) =>{
    setId(event.target.value);
        const response = await fetch('http://localhost:8081/user/deleteAppointment/'+event.target.value, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id
            })
          });
      
          if (response.ok) {
            setId(0);
          } else {
            setCheck(2);
          }
    };
  useEffect(()=>{
    getData()
  },[])
  return (
    <form onSubmit={getData}>
        
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Approve</TableCell>
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => {
                return (
                  <TableRow className='tablebodyrow3' hover role="checkbox" tabIndex={-1} key={app.id}>
                    {columns.map((column) => {
                      const value = app[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell><button value={app.id} onClick={handleapprove}>Approve</button></TableCell>
                    <TableCell><button value={app.id} onClick={handledelete}>Cancel</button></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25, 50, 100, data.length]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper> 
    {check===1 && (
      <div>
        <h2>
          Appointment Approved
        </h2>
      </div>
      )}   
      {check===2 && (
      <div>
        <h2>
          Something went wrong
        </h2>
      </div>
      )}
      
    </form>
  );
}

export default ApproveAppointment;