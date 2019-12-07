const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load enviromnent variables
dotenv.config({ path: './config/config.env'});

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamp');
const courses = require('./routes/courses');
const app = express();

//Body Parser
app.use(express.json());

//Developer loading middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//File upload
app.use(fileUpload());

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

//Mount router
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close servers and exit process
    server.close(() => process.exit(1));
})