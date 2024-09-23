import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from './Cards'; // Import your Cards component

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await fetch(`http://localhost:4003/product/search?category=${query}`);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, [query]);

    const handleDelete = (id) => {
        // Implement delete logic here
        console.log(`Deleting product with ID: ${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map(product => (
                            <Cards 
                                key={product._id} 
                                item={product} 
                                onDelete={handleDelete} 
                            />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
