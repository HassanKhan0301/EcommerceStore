import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

function Cards({ item ,onDelete }) {
    const handleUpdateClick = () => {
        console.log("Updating item with ID:", item._id);
      };
      const imageSrc = item.image 
      ? `http://localhost:4003/${item.image.replace(/\\/g, '/')}` 
      : "http://localhost:4003/path/to/fallback-image.png";
  return (
    <>
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
      <figure>
                    <img 
                        src={imageSrc} 
                        alt="Product" 
                        onError={(e) => { e.target.src = "http://localhost:4003/path/to/fallback-image.png"; }} // Valid fallback URL
                        className="card-image"
                        />
                </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.company}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </div>
            <div className="mt-2 flex space-x-2">
            <Link
                to={`/edit/${item._id}`}
                onClick={handleUpdateClick}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Update
              </Link>
                <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                    Delete
                    </button>
                    </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Cards