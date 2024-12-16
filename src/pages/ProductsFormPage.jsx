import { useForm, Controller } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd,IoCloseSharp } from "react-icons/io5";

function ProductsFormPage() {
const server = import.meta.env.VITE_BASE_URL+"/img/";
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:'',
      price: 0.0,
      year: new Date().getFullYear(),
      image: uploadIcon
    },
  });

  const { createProduct, getProduct, updateProduct,errors:productErrors } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon); // Imagen actual o seleccionada
  const [existingImageUrl, setExistingImageUrl] = useState(null); // URL de la imagen existente
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        try {
          const product = await getProduct(params.id);
          setValue("name", product.name);
          setValue("price", product.price);
          setValue("year", product.year);

          if (product.imageUrl) {
            setExistingImageUrl(product.imageUrl);
            setSelectedImage(product.imageUrl);
          }
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      }
    }
    loadProduct();
  }, [params.id, getProduct, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const formData= new FormData();
    formData.append('name',data.name);
    formData.append('price',data.price);
    formData.append('year',data.year);
    formData.append('image',data.image);

    if (data.image =="/src/assets/addphoto.svg"){
      productErrors.push("no se ha elegido una imagen");
      return
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("year", data.year);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else {
        alert("La imagen es obligatoria.");
        return;
      }

      if (params.id) {
        await updateProduct(params.id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/products");
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
      <h1 className="text-3xl from-bold my-2">Productos</h1>
        {
          productErrors?.map((error,i)=>(
            <div className="text-red-500 py-2 my-2"
              key={i}>
                {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del producto"
            
            {
              ...register("name", { required: true})}
            autoFocus
          />
          {errors.name && 
          <div className="text-red-500 text-sm">Nombre del producto es requerido</div>}

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.10"
            id="price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Precio del producto"
            {...register("price", {
              required: "true",
              min:0.0,
              valueAsNumber: true,
            })}
          />
          {errors.price && <div className="text-red-500 text-sm">Precio del producto es requerido</div>}
          {errors.year?.type==="min" && <div className="text-red-500 text-sm">El precio minimo es de 0</div>}


          <label htmlFor="year">Año</label>
          <input
            type="number"
            max={new Date().getFullYear()}
            min="1900"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Año del producto"
            {...register("year", {
              required: true,
              min:1900,
              max:new Date().getFullYear(),
              valueAsNumber: true,
            })}
          />
          {errors.year && <div className="text-red-500 text-sm">Año del producto es requerido</div>}
          {errors.year?.type==="min" && <div className="text-red-500 text-sm">El año minimo es de 1900</div>}
          {errors.year?.type==="max" && <div className="text-red-500 text-sm">El año maximo es {new Date().getFullYear()}</div>}

          <div className="py-2 my-2">
            {selectedImage && (
              <img
                src={server+selectedImage}
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
            {errors.image && <p className="text-red-500 text-sm">Imagen del producto es requerido</p>}
          </div>

          <button className="bg-green-300 hover:bg-green-500
           text-white font-semibold hover:text-gray-100 
           py-2 px-4 border border-zinc-500 hover:border-transparent rounded">
            <IoBagAdd size={30} />
          </button>
          <button className="bg-red-300 hover:bg-green-500
           text-white font-semibold hover:text-gray-100 
           py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
            onClick={()=>{navigate('/product')}}>
            <IoCloseSharp  size={30} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
