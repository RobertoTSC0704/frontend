import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

function SalesCard({ sale }) {
    const { deleteSale } = useSales(); // Usar el contexto de ventas

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-sm">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{sale.clientName}</h1> {/* Nombre del cliente */}
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            deleteSale(sale._id); // Eliminar la venta
                        }}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link
                        to={'/sales/' + sale._id} // Ruta para editar la venta
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>
            <div className="flex justify-around">
                <p className="text-slate-300 my-2 flex">
                    <span>Precio:</span> {sale.price} {/* Precio de la venta */}
                </p>
                <p className="text-slate-300 my-2 flex">
                    <span>Cantidad:</span> {sale.quantity} {/* Cantidad de productos */}
                </p>
            </div>
        </div>
    );
}

export default SalesCard;

SalesCard.propTypes = {
    sale: PropTypes.shape({
        
        clientName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }),
};
