import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

function Updates() {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Fetch product details on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:4003/product/products/${id}`);
                // Set fetched product data into form fields
                setValue("name", res.data.name);
                setValue("price", res.data.price);
                setValue("category", res.data.category);
                setValue("company", res.data.company);
            } catch (err) {
                toast.error("Failed to fetch product details.");
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("company", data.company);
      
      // If you have an image input in your form, append it as well
      const imageInput = document.querySelector('input[type="file"]');
      if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
      }
    
      try {
        const res = await axios.put(`http://localhost:4003/product/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success("Product Updated Successfully");
        navigate(from, { replace: true });
      } catch (err) {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };
    

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-[600px]">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        <h3 className="font-bold text-lg">Update Product</h3>
                        <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your ProductName"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  
                  {...register("name", { required: true })}
                  />
                  <br />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Price</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your Price"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  
                  {...register("price", { required: true })}
                />
                <br />
                {errors.price && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
                
              </div>
              {/* category */}
              <div className="mt-4 space-y-2">
                <span>Category</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your Category"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
               
                 {...register("category", { required: true })}
                />
                <br />
                {errors.category && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
                
              </div>

              <div className="mt-4 space-y-2">
                <span>Company</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your Company"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
               
                 {...register("company", { required: true })}
                />
                <br />
                {errors.company && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
                
              </div>


                        <div className="mt-4 space-y-2">
  <span>Image</span>
  <input type="file" accept="image/*" className="w-80 px-3 py-1 border rounded-md outline-none" />
</div>

                        <div className="flex justify-around mt-4">
                            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Updates;
