# Factory Management System

A full-stack factory management application built with Node.js, Express, and MongoDB.  
The system allows managing employees, departments, and shifts with a clear backend architecture.
(Project is actively under development)

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- dotenv
- React

## Project Structure
```text
src/
├── routes/
├── services/
├── repositories/
├── models/
├── middlewares/
├── config/
├── app.js
└── index.js
```


## Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB (local installation or MongoDB Atlas account)



## Database Setup

This project requires a running MongoDB instance.


1. Install MongoDB on your machine
2. Start MongoDB service
3. The default connection string:
   mongodb://localhost:27017


## Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```


## How to Run
```bash
# Clone the repository
git clone https://github.com/Yitzhakbin9/employees-management-system.git

# Install dependencies
npm install

# Run backend
node index.js

# Run frontend
npm run dev
```



## To Do
```bash
- Add log file for users actions
```

