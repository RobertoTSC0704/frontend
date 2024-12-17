import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createSaleRequest, getSalesRequest, deleteSaleRequest, getSaleRequest, updateSaleRequest } from "../api/sales";

const SalesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSales = () => {
    const context = useContext(SalesContext);
    if (!context) {
        throw new Error("useSales debe estar definido en un contexto");
    }
    return context;
};

export function SalesProvider({ children }) {
    const [sales, setSales] = useState([]);
    const [errors, setErrors] = useState([]);

    const createSale = async (sale) => {
        try {
            await createSaleRequest(sale);
            getSales(); // Llamar a getSales después de crear la venta
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
            console.log("Error al crear venta:", error);
        }
    };

    const getSales = async () => {
        try {
            const res = await getSalesRequest();
            setSales(res.data); // Asegúrate de que res.data contiene las ventas
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
            console.log("Error al obtener las ventas:", error);
        }
    };

    const deleteSale = async (id) => {
        try {
            const res = await deleteSaleRequest(id);
            if (res.status === 200) {
                setSales(sales.filter(sale => sale._id !== id));
            }
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
            console.log("Error al eliminar venta:", error);
        }
    };

    const getSale = async (id) => {
        try {
            const res = await getSaleRequest(id);
            return res.data;
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
            console.log("Error al obtener una venta:", error);
        }
    };

    const updateSale = async (id, sale) => {
        try {
            const res = await updateSaleRequest(id, sale);
            console.log("Venta actualizada:", res);
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
            console.log("Error al actualizar venta:", error);
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

// Corrección del uso de propTypes
SalesProvider.propTypes = {
    children: PropTypes.any,
};
