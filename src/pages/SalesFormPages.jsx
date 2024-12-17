import { useForm} from "react-hook-form";
import { useSales } from "../context/SalesContext";
import { useEffect } from "react";
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
      productName: '',
      price: 0.0,
      quantity: 0,
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
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);

    try {
      if (params.id) {
        await updateSale(params.id, formData);
      } else {
        await createSale(formData);
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
        <h1 className="text-3xl from-bold my-2">Ventas</h1>
        {saleErrors?.map((error, i) => (
          <div className="text-red-500 py-2 my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label htmlFor="productName">Nombre</label>
          <input
            type="text"
            id="productName"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del producto"
            {...register("productName", { required: true })}
            autoFocus
          />
          {errors.productName && (
            <div className="text-red-500 text-sm">Nombre de la venta es requerido</div>
          )}

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.10"
            id="price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Precio del producto"
            {...register("price", {
              required: true,
              min: 0.0,
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <div className="text-red-500 text-sm">Precio del producto es requerido</div>
          )}
          {errors.price?.type === "min" && (
            <div className="text-red-500 text-sm">El precio mínimo es de 0</div>
          )}

          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Cantidad del producto"
            {...register("quantity", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <div className="text-red-500 text-sm">Cantidad del producto es requerida</div>
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
