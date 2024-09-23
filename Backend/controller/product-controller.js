import Product from '../Model/product-model.js';
import upload from '../upload.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { name, price, category, company } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !price || !category || !company) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({ name, price, category, company, image });
        await newProduct.save();
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};
// Get a single product
export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};


// Update a product
// In your product controller
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category, company } = req.body;
    const image = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Log received data for debugging
    console.log("Received data:", { name, price, category, company, image });

    // Validate required fields
    if (!name || !price || !category || !company) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Update product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, 
            { 
                name, 
                price, 
                category, 
                company, 
                ...(image && { image }) // Only update the image if it exists
            }, 
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};



// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Search products by category
export const searchProductsByCategory = async (req, res) => {
    const { category } = req.query;
    console.log("Search endpoint hit!"); // Log that the endpoint is hit
    console.log("Search category:", category); 

    try {
        const products = await Product.find({ category: new RegExp(category, 'i') });
        console.log("Products found:", products);
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category.' });
        }
        
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

