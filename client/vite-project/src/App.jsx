import Employees from './components/Employees'
import EditEmployee from './components/EditEmployee'
import NewEmployee from './components/NewEmployee'
import Department from './components/Department'
import EditDepartment from './components/EditDepartment'
import NewDepartment from './components/NewDepartment'
import Shifts from './components/Shifts'
import Users from './components/Users'
import LogIn from './components/LogIn'
import AllActions from './components/AllActions'
import UserDetails from './components/UserDetails'
// import Test from './components/Test'
import { Route, Routes } from "react-router-dom"


function App() {

  return (


    <div style={{ border: '3px solid grey' }}>

      <Routes>

        <Route path="/login" element={<LogIn />} />
        <Route path="/actionsPage" element={<AllActions />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/newEmployee" element={<NewEmployee />} />
        <Route path="/editEmployee/:id" element={<EditEmployee />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/editDepartment/:id" element={<EditDepartment />} />
        <Route path="/newDepartment" element={<NewDepartment />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/usersDetails" element={<UserDetails />} />

      </Routes>

      {/* <Test/> */}

      {/* <LogIn/> */}
      {/* <Employees/> */}
      {/* <Employee/> */}
      {/* <NewEmployee/> */}
      {/* <Department /> */}
      {/* <EditDepartment /> */}
      {/* <NewDepartment /> */}
      {/* <Shifts /> */}
      {/* <Users /> */}
    </div>


  )
}

export default App
