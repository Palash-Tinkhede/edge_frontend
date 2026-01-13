import Login from './pages/Login';
import Register from './pages/Register';
import Monitor from './pages/Monitoring';
import Otp from './pages/Otp';
import Error from './pages/Error';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RemoteAccess from './pages/remote_access';
import LandingDashboard from './pages/Landing_dashboard';
import Cluster from './pages/cluster';
import VmPage from './pages/vm_page';
function App() {
  return (
    <>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LandingDashboard />} />
        <Route path='/monitor' element={<Monitor />} />
        <Route path='/nodes' element={<RemoteAccess />} />
        <Route path='/landing_dashboard' element={<LandingDashboard />} />
        <Route path='/vm_page' element={<VmPage />} />
        <Route path='/cluster' element={<Cluster />} />
        <Route path='/user/otp' element={<Otp />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
