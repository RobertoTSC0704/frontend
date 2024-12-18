import PropTypes from 'prop-types';
//import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { IoTrashBinSharp,IoPencilSharp } from 'react-icons/io5';

function ProductCard({ product }) {
    const server = import.meta.env.VITE_BASE_URL+"/img/";
    const{deleteProduct} = useProducts()



    
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-sm">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className='bg-red-500 hover:bg-red-600
                    text-white px-4 py-2 rounded-lg'
                    onClick={()=>{
                        //console.log(product._id);
                        deleteProduct(product._id);
                    }}>
                        <IoTrashBinSharp/>
                    </button>
                    <Link to={'/products/' + product._id}
                    className='bg-green-500 hover:bg-green-600
                    text-white px-4 py-2 rounded-lg'>
                    <IoPencilSharp/>
                    </Link>
                </div>
            </header>
                <div className='flex justify-center'>
                    <img 
                    src={server+ product.image} 
                    alt="Imagen Seleccionada" 
                    width={200}
                    height={200}
                    className='max-h[200px] object-contain flex my-2 py-2'
                    />
                </div>
                <div className='flex justify-around'>
                    <p className='text-slate-300 my-2 flex'>
                        <span>Precio:</span>{product.price}
                    </p>
                    <p className='text-slate-300 my-2 flex'>
                        <span>Año:</span>{product.year}
                    </p>
                </div>
        </div>
    );
}

export default ProductCard;
ProductCard.propTypes = {
    product: PropTypes.any
};