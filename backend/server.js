import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// Route files
import posts from './routes/posts.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Cors
app.use(cors());

// Set static folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Body parser
app.use(express.json());

// Cookie parser 
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`.yellow));
