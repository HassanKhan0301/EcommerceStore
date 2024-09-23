import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String }
});

const Product = mongoose.model("Product",productSchema);

export default Product;