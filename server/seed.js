const mongoose = require('mongoose');

const Department = require('./models/Department');
const Employee = require('./models/Employee');

const MONGO_URL = 'mongodb://127.0.0.1:27017/shiftsManagerDB';

const runSeed = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');

    // ניקוי קודם (אופציונלי)
    await Department.deleteMany();
    await Employee.deleteMany();

    // יצירת מחלקה
    const department = await Department.create({
      department_name: 'IT'
    });

    // יצירת עובד (מנהל)
    const manager = await Employee.create({
      first_name: 'Dan',
      last_name: 'Cohen',
      start_year: 2021,
      department_id: department._id,
      role: 'manager'
    });

    // עדכון manager_id במחלקה
    department.manager_id = manager._id;
    await department.save();

    console.log('Seed finished successfully');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();