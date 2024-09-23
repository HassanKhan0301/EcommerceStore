import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from './Cards';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';


function All_products() {
    const [All, setProduct] = useState([]);
    useEffect(()=>{
        const getProduct = async ()=>{
            try {
                const res = await axios.get("http://localhost:4003/product/products");
                console.log(res.data);
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    },[])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4003/product/products/${id}`);
            if (response.status === 200) {
                // Remove the deleted product from the state
                setProduct((prevProducts) => prevProducts.filter(item => item._id !== id));
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product");
        }
    };

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
   <>
     <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
            consequatur!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        </div>

        <div className="slider-container">
      <Slider {...settings}>
        {All.map((item)=>(
            <Cards item={item} key={item._id} onDelete={handleDelete}/>
        ))}
      </Slider>
    </div>
   </>
  )
}

export default All_products