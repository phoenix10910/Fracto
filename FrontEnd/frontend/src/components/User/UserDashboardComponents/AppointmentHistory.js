import React,{useState,useEffect} from 'react';
import '../../../style/User/AppointmentHistory.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'username', label: 'UserName', minWidth: 170 },
  { id: 'doctorname', label: 'DoctorName', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'timings',
    label: 'Time Slot',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function AppointmentHistory() {
  const [data,setData]=useState([]);
  const [id,setId]=useState(0);
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
  const getData=()=>{
    fetch('http://localhost:8081/user/getAppointmentByUsername'
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
            setCheck(1);
          }
    };
  useEffect(()=>{
    getData()
  },[])
  return (
    <form onSubmit={getData}>
      <div className='table3'>
        <div className='heading2'></div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
        {columns.map((column) => (
                <TableCell className='tablecell'
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:'darkblue', color:'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 100,backgroundColor: 'darkblue',color:'white' }}>Cancel</TableCell>
            </TableRow>
            </TableHead>
          <TableBody>
          {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => {
                return (
                  <TableRow className="tablebodyrow" hover role="checkbox" tabIndex={-1} key={app.id}>
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
                    <td><button value={app.id} onClick={handledelete}>Cancel Appointment</button></td>
                  </TableRow>
                );
              })}
          </TableBody>
          </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25, 100, data.length]}
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
        <h2 className='heading3'>
          Something went Wrong
        </h2>
      </div>
      )}
    </div> 
    </form>
  );
}

export default AppointmentHistory;