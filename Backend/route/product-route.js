import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProductsByCategory } from '../controller/product-controller.js';
import upload from '../upload.js';

const router = express.Router();

router.post('/products', upload.single('image'), createProduct);

// Create product route
router.post('/products', createProduct);

// Get all products route
router.get('/products', getProducts);

// Get single product route
router.get('/products/:id', getProduct); // New route for getting a product by ID

// Update product 
router.put('/products/:id', upload.single('image'), updateProduct);

router.get('/search', searchProductsByCategory); // New search route


router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
