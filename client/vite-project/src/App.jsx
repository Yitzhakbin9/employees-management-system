import Employees from './components/Employees'
import EditEmployee from './components/EditEmployee'
import NewEmployee from './components/NewEmployee'
import Department from './components/Department'
import EditDepartment from './components/EditDepartment'
import NewDepartment from './components/NewDepartment'
import Shifts from './components/Shifts'
import NewShift from './components/NewShift'
import Users from './components/Users'
import LogIn from './components/LogIn'
import AllActions from './components/AllActions'
import UserDetails from './components/UserDetails'
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/actionsPage" element={<AllActions />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/newEmployee" element={<NewEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/editDepartment/:id" element={<EditDepartment />} />
          <Route path="/newDepartment" element={<NewDepartment />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/newShifts" element={<NewShift />} />
          <Route path="/users" element={<Users />} />
          <Route path="/usersDetails" element={<UserDetails />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
