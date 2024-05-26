import './App.css';
import { Routes,Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Home from './components/Home';
import RegisterUser from './components/User/RegisterUser';
import RegisterAdmin from './components/Admin/RegisterAdmin';
import LoginAdmin from './components/Admin/LoginAdmin';
import LoginUser from './components/User/LoginUser';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import DisplayDoctor from './components/Admin/AdminDashboardComponents/DisplayDoctor';
import AddDoctor from './components/Admin/AdminDashboardComponents/AddDoctor';
import UpdateDoctor from './components/Admin/AdminDashboardComponents/UpdateDoctor';
import UserDisplay from './components/Admin/AdminDashboardComponents/UserDisplay';
import DoctorSelect from './components/User/UserDashboardComponents/DoctorSelect';
import Appointment from './components/User/UserDashboardComponents/Appointment';
import Booking from './components/User/UserDashboardComponents/Booking';
import AppointmentHistory from './components/User/UserDashboardComponents/AppointmentHistory';
import ApproveAppointment from './components/Admin/AdminDashboardComponents/ApproveAppointment';
import Appointments from './components/Admin/AdminDashboardComponents/Appointments';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<FirstPage/>}></Route>  
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/registerUser' element={<RegisterUser/>}></Route>
      <Route path='/registerAdmin' element={<RegisterAdmin/>}></Route>
      <Route path='/loginUser' element={<LoginUser/>}></Route>
      <Route path='/loginAdmin' element={<LoginAdmin/>}></Route>
      <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
      <Route path='/userDashboard' element={<UserDashboard/>}></Route>
      <Route path='/displayDoctor' element={<DisplayDoctor/>}></Route>
      <Route path='/addDoctor' element={<AddDoctor/>}></Route>
      <Route path='/updateDoctor' element={<UpdateDoctor/>}></Route>
      <Route path='/userDisplay' element={<UserDisplay/>}></Route>
      <Route path='/doctorSelect' element={<DoctorSelect/>}></Route>
      <Route path='/appointment' element={<Appointment/>}></Route>
      <Route path='/booking' element={<Booking/>}></Route>
      <Route path='/appointmentHistory' element={<AppointmentHistory/>}></Route>
      <Route path='/approveAppointment' element={<ApproveAppointment/>}></Route>
      <Route path='/allAppointments' element={<Appointments/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
