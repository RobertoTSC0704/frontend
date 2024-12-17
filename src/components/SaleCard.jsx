import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

function SaleCard({ sale }) {
    const server = import.meta.env.VITE_BASE_URL + "/img/";
    const { deleteSale } = useSales();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-sm">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{sale.productName}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                        onClick={() => {
                            deleteSale(sale._id);
                        }}>
                        <IoTrashBinSharp />
                    </button>
                    <Link to={'/sales/' + sale._id}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'>
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>
            <div className='flex justify-center'>
                <img 
                    src={server + sale.image} 
                    alt="Imagen de la venta" 
                    width={200}
                    height={200}
                    className='max-h[200px] object-contain flex my-2 py-2'
                />
            </div>
            <div className='flex justify-around'>
                <p className='text-slate-300 my-2 flex'>
                    <span>Precio:</span> {sale.price}
                </p>
                <p className='text-slate-300 my-2 flex'>
                    <span>Cantidad:</span> {sale.quantity}
                </p>
            </div>
        </div>
    );
}

export default SaleCard;

SaleCard.propTypes = {
    sale: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        image: PropTypes.string
    }).isRequired
};
