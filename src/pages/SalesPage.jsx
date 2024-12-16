import { useEffect } from "react";
import { useSales } from '../context/SalesContext';  // Asegúrate de tener un contexto para ventas
import SalesCard from "../components/SalesCard";  // Usamos SalesCard en lugar de ProductCard

function SalesPage() {
  const { getSales, sales } = useSales();  // Obtener ventas en lugar de productos

  // Ejecutamos la función getSales inmediatamente después de que se cargue el componente
  useEffect(() => {
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sales.length === 0)
    return (<h1>No hay ventas para listar</h1>);  // Mensaje cuando no hay ventas

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        sales.map((sale) => (
          <SalesCard sale={sale}  // Pasamos la venta al componente SalesCard
            key={sale._id}  // Usamos el _id de la venta como clave
          />
        ))
      }
    </div>
  );
}

export default SalesPage;
