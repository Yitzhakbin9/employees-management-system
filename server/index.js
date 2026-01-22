require('dotenv').config(); // For environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');



const authRouter = require('./routers/authRouter');
const employeeRouter = require('./routers/employeeRouter');
const departmentRouter = require('./routers/departmentRouter');
const shiftService = require('./routers/shiftRouter');
const userRouter = require('./routers/userRouter');
const employeeShiftRouter = require('./routers/employeeShiftRouter');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());



app.use('/auth', authRouter);

app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);
app.use('/shifts', shiftService);
app.use('/users', userRouter);
app.use('/employeeShifts', employeeShiftRouter);



console.log('Connectd')
app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
  connectDB();
});


// Base URL: http://localhost:3000
