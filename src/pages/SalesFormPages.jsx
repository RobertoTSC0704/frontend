import { useForm, Controller } from "react-hook-form";
import { useSales } from "../context/SalesContext"; // Importar el contexto de ventas
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd, IoCloseSharp } from "react-icons/io5";

function SalesFormPage() {

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: '',
      price: 0.0,
      year: new Date().getFullYear(),
      image: uploadIcon
    },
  });

  const { createSale, getSale, updateSale, errors: saleErrors } = useSales();
  const [selectedImage, setSelectedImage] = useState(uploadIcon); // Imagen actual o seleccionada
  const [existingImageUrl, setExistingImageUrl] = useState(null); // URL de la imagen existente
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadSale() {
      if (params.id) {
        try {
          const sale = await getSale(params.id);
          setValue("productName", sale.productName);
          setValue("price", sale.price);
          setValue("year", sale.year);

          if (sale.imageUrl) {
            setExistingImageUrl(sale.imageUrl);
            setSelectedImage(sale.imageUrl);
          }
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
    formData.append('year', data.year);
    formData.append('image', data.image);

    if (!data.image && !existingImageUrl) {
      alert("Debe seleccionar una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("year", data.year);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else {
        alert("La imagen es obligatoria.");
        return;
      }

      if (params.id) {
        await updateSale(params.id, formData);
      } else {
        await createSale(formData);
      }
      navigate("/sales"); // Navegar a la lista de ventas
    } catch (error) {
      console.error("Error al enviar datos:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Algo salió mal"}`);
    }
  });

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    setSelectedImage(file ? URL.createObjectURL(file) : existingImageUrl || uploadIcon);
    field.onChange(file);
  };

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
          <label htmlFor="productName">Producto</label>
          <input
            type="text"
            id="productName"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del producto"
            {...register("productName", { required: true })}
            autoFocus
          />
          {errors.productName && <div className="text-red-500 text-sm">Nombre del producto es requerido</div>}

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.10"
            id="price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Precio de la venta"
            {...register("price", {
              required: "true",
              min: 0.0,
              valueAsNumber: true,
            })}
          />
          {errors.price && <div className="text-red-500 text-sm">Precio de la venta es requerido</div>}
          {errors.price?.type === "min" && <div className="text-red-500 text-sm">El precio mínimo es de 0</div>}

          <label htmlFor="year">Año</label>
          <input
            type="number"
            max={new Date().getFullYear()}
            min="1900"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Año de la venta"
            {...register("year", {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
              valueAsNumber: true,
            })}
          />
          {errors.year && <div className="text-red-500 text-sm">Año de la venta es requerido</div>}
          {errors.year?.type === "min" && <div className="text-red-500 text-sm">El año mínimo es de 1900</div>}
          {errors.year?.type === "max" && <div className="text-red-500 text-sm">El año máximo es {new Date().getFullYear()}</div>}

          <div className="py-2 my-2">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                width={200}
                height={200}
                className="max-h-52 object-contain cursor-pointer"
                onClick={handleImageClick}
              />
            )}
            <Controller
              name="image"
              control={control}
              rules={{
                required: "La imagen es obligatoria.",
              }}
              render={({ field }) => (
                <input
                  type="file"
                  ref={inputImage}
                  onChange={(e) => handleImageChange(e, field)}
                  className="hidden"
                />
              )}
            />
            {errors.image && <p className="text-red-500 text-sm">Imagen de la venta es requerida</p>}
          </div>

          <button className="bg-green-300 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-zinc-500 hover:border-transparent rounded">
            <IoBagAdd size={30} />
          </button>
          <button
            className="bg-red-300 hover:bg-red-500 text-white font-semibold py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
            onClick={() => { navigate('/sales') }}
          >
            <IoCloseSharp size={30} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalesFormPage;
