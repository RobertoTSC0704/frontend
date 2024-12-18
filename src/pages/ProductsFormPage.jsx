import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

function ProductsFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("image", product.image);
      }
    }
    fetchProduct();
  }, [params.id, setValue, getProduct]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (params.id) {
      await updateProduct(params.id, formData);
    } else {
      await createProduct(formData);
    }
    navigate("/products");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-bold mb-5">
          {params.id ? "Editar Producto" : "Crear Producto"}
        </h1>

        <input
          type="text"
          placeholder="Nombre del Producto"
          {...register("name", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          placeholder="Descripción"
          {...register("description", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="number"
          placeholder="Precio"
          {...register("price", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-400"
        >
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default ProductsFormPage;
