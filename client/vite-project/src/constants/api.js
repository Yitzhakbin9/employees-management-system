const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_URLS = {
  auth: `${API_BASE_URL}/auth`,
  users: `${API_BASE_URL}/users`,
  employees: `${API_BASE_URL}/employees`,
  employeeDetails: `${API_BASE_URL}/employees/full-details`,
  departments: `${API_BASE_URL}/departments`,
  departmentsWithEmployees: `${API_BASE_URL}/departments/department-with-employees`,
  shifts: `${API_BASE_URL}/shifts`,
  employeeShifts: `${API_BASE_URL}/employeeShifts`,
};

export default API_BASE_URL;
