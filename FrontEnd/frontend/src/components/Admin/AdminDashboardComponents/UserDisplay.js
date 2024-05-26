import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../../../style/Admin/UserDisplay.css';


const columns = [
  { id: 'username', label: 'Name', minWidth: 70 },
  {
    id: 'email',
    label: 'EmailId',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function UserDisplay() {
  const [data,setData]=useState([]);
  const [page, setPage] = React.useState(0);
  const [check,setCheck] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const username=event.target.value;
    const response = await fetch('http://localhost:8082/admin/deleteUser/'+username, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    });

    if (response.ok) {
      getData();
    } else {
      setCheck(1);
    }
  };

  const getData=()=>{
    fetch('http://localhost:8082/admin/displayUser'
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
    <form onSubmit={getData}>
       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: 'darkblue',color:'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 70,backgroundColor: 'darkblue',color:'white' }}>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow className='tablebodyrow2' hover role="checkbox" tabIndex={-1} key={user.name}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell><button type="submit" value={user.username} onClick={handleSubmit}>Remove User</button></TableCell>
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
          Something Went Wrong
        </h2>
      </div>
      )}    
    </form>
  );
}

export default UserDisplay;