import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { 
  createSaleRequest, 
  getSalesRequest, 
  deleteSaleRequest, 
  getSaleRequest, 
  updateSaleRequest 
} from "../api/sales";

// Creamos el contexto de ventas
const SalesContext = createContext();

// Hook personalizado para acceder al contexto de ventas
// eslint-disable-next-line react-refresh/only-export-components
export const useSales = () => {
    const context = useContext(SalesContext);
    if (!context) {
        throw new Error("useSales debe estar definido dentro de un SalesProvider");
    }
    return context;
};

// Componente proveedor del contexto de ventas
export function SalesProvider({ children }) {
    const [sales, setSales] = useState([]);
    const [errors, setErrors] = useState([]); // Para manejar errores

    // Función para crear una venta
    const createSale = async (sale) => {
        try {
            await createSaleRequest(sale);
            getSales(); // Vuelve a cargar las ventas después de crear una
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            setErrors(prevErrors => [...prevErrors, errorMessage]);
            console.error(error);
        }
    };

    // Función para obtener todas las ventas
    const getSales = async () => {
        try {
            const res = await getSalesRequest();
            setSales(res.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            setErrors(prevErrors => [...prevErrors, errorMessage]);
            console.error(error);
        }
    };

    // Función para eliminar una venta
    const deleteSale = async (id) => {
        try {
            const res = await deleteSaleRequest(id);
            if (res.status === 200) {
                setSales(sales.filter(sale => sale._id !== id)); // Filtra la venta eliminada
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            setErrors(prevErrors => [...prevErrors, errorMessage]);
            console.error(error);
        }
    };

    // Función para obtener una venta específica
    const getSale = async (id) => {
        try {
            const res = await getSaleRequest(id);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            setErrors(prevErrors => [...prevErrors, errorMessage]);
            console.error(error);
        }
    };

    // Función para actualizar una venta
    const updateSale = async (id, sale) => {
        try {
            const res = await updateSaleRequest(id, sale);
            console.log(res);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error desconocido";
            setErrors(prevErrors => [...prevErrors, errorMessage]);
            console.error(error);
        }
    };

    return (
        <SalesContext.Provider
            value={{
                sales,
                createSale,
                getSales,
                deleteSale,
                getSale,
                updateSale,
                errors,
            }}
        >
            {children}
        </SalesContext.Provider>
    );
}

// Corrección del uso de PropTypes para los children
SalesProvider.propTypes = {
    children: PropTypes.node.isRequired,  // children debe ser de tipo 'node' para mayor flexibilidad
};
