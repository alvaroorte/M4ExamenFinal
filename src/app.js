import express from 'express';
import morgan from 'morgan';

const app = express();

// Import routes
import userRoutes from './routes/users.routes.js';
import categoryRoutes from './routes/categories.routes.js';
import productRoutes from './routes/products.routes.js';

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

export default app;
