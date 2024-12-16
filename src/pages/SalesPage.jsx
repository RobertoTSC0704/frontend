import { useEffect } from "react";
import { useSales } from '../context/SalesContext';
import SalesCard from "../components/SalesCard";

function SalesPage() {
  const { getSales, sales } = useSales();

  // Ejecutamos la función getSales inmediatamente después de que se cargue el componente
  useEffect(() => {
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sales.length === 0) {
    return (<h1>No hay ventas para listar</h1>);
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        sales.map((sales) => (
          <SalesCard sales={sales} key={sales._id} />
        ))
      }
    </div>
  );
}

export default SalesPage;
