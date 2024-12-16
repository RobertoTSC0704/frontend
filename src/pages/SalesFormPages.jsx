import { useForm} from "react-hook-form";
import { useSales } from "../context/SalesContext";
import {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd, IoCloseSharp } from "react-icons/io5";

function SalesFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: '',
      price: 0.0,
      quantity: 1,
    },
  });

  const { createSale, getSale, updateSale, errors: saleErrors } = useSales();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadSale() {
      if (params.id) {
        try {
          const sale = await getSale(params.id);
          setValue("productName", sale.productName);
          setValue("price", sale.price);
          setValue("quantity", sale.quantity);
        } catch (error) {
          console.error("Error al cargar la venta:", error);
        }
      }
    }
    loadSale();
  }, [params.id, getSale, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateSale(params.id, data);
      } else {
        await createSale(data);
      }
      navigate("/sales");
    } catch (error) {
      console.error("Error al enviar datos:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Algo salió mal"}`);
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold my-2">Ventas</h1>
        {saleErrors?.map((error, i) => (
          <div className="text-red-500 py-2 my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label htmlFor="productName">Nombre del Producto</label>
          <input
            type="text"
            id="productName"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del producto"
            {...register("clientName", { required: true })}
            autoFocus
          />
          {errors.clientName && (
            <div className="text-red-500 text-sm">El nombre del cliente es requerido</div>
          )}

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.01"
            id="price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Precio de la venta"
            {...register("price", {
              required: "El precio es requerido",
              min: 0.01,
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <div className="text-red-500 text-sm">El precio de la venta es requerido</div>
          )}
          {errors.price?.type === "min" && (
            <div className="text-red-500 text-sm">El precio mínimo es de 0.01</div>
          )}

          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Cantidad de productos"
            {...register("quantity", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <div className="text-red-500 text-sm">La cantidad es requerida</div>
          )}
          {errors.quantity?.type === "min" && (
            <div className="text-red-500 text-sm">La cantidad mínima es de 1</div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-500 text-white font-semibold hover:text-gray-100 py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
            >
              <IoBagAdd size={30} />
            </button>
            <button
              type="button"
              className="bg-red-300 hover:bg-red-500 text-white font-semibold hover:text-gray-100 py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
              onClick={() => navigate("/sales")}
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SalesFormPage;