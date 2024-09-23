import mongoose from "mongoose";

const AllSchema = mongoose.Schema({
    name: String,
    price: String,
    category:String,
    userId: String,
    company: String,
});

const All_Product = mongoose.model("All_Product",AllSchema);

export default All_Product;