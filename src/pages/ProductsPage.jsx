import { useEffect, useState } from "react";


function ProductsPage() {
 

  // Estado local para los productos y el producto que está siendo editado
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Botas Guess",
      price: 100,
      year: 2023,
      imageUrl: "/Guess.jpg",
    },
    {
      _id: "2",
      name: " Botas Dama.jpg",
      price: 200,
      year: 2022,
      imageUrl: "/Dama.jpg",
    },
    {
      _id: "3",
      name: "Botas Mujer",
      price: 300,
      year: 2021,
      imageUrl: "/Mujer.jpg",
    },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);  // Producto a editar
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    year: "",
    imageUrl: "",
  });
  const [showAddForm, setShowAddForm] = useState(false); // Estado para mostrar/ocultar el formulario de agregar

  useEffect(() => {
    // Lógica para cargar productos desde el servidor si fuera necesario
    // getProducts();
  }, []);

  // Función para manejar la eliminación de productos
  const handleDelete = (productId) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirm) {
      setProducts(products.filter((product) => product._id !== productId));
    }
  };

  // Función para manejar la edición de un producto
  const handleStartEdit = (product) => {
    setEditingProduct(product._id);  // Establece el producto que se está editando
    setProductData({
      name: product.name,
      price: product.price,
      year: product.year,
      imageUrl: product.imageUrl,
    });
  };

  // Función para manejar la actualización de un producto (esto se llamará en el formulario de edición)
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product._id === editingProduct ? { ...product, ...productData } : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);  // Finaliza la edición
    setProductData({
      name: "",
      price: "",
      year: "",
      imageUrl: "",
    });
  };

  // Función para manejar la adición de un nuevo producto
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      _id: Date.now().toString(),
      ...productData,
    };
    setProducts([...products, newProduct]);
    setProductData({
      name: "",
      price: "",
      year: "",
      imageUrl: "",
    });
  };

  // Función para manejar la carga de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        imageUrl: URL.createObjectURL(file),  // Genera una URL temporal para la imagen
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Listado de Productos</h1>
     
      </div>

      {/* Botón para mostrar u ocultar el formulario de agregar producto */}
      <div className="mb-6">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Ocultar Formulario" : "Agregar Producto"}
        </button>
      </div>

      {/* Formulario para agregar o editar producto (solo se muestra si `showAddForm` es true) */}
      {showAddForm && (
        <div className="bg-white p-4 mb-6 border border-gray-200 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre del Producto</label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Precio</label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Año</label>
              <input
                type="number"
                value={productData.year}
                onChange={(e) => setProductData({ ...productData, year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              {productData.imageUrl && (
                <img src={productData.imageUrl} alt="Imagen del producto" className="mt-2 w-20 h-20 object-cover rounded-md" />
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Productos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Imagen</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Precio</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Año</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4 text-black">{product.name}</td>
                <td className="py-3 px-4 text-black">${product.price}</td>
                <td className="py-3 px-4 text-black">{product.year}</td>
                <td className="py-3 px-4">
                  {/* Botón Editar */}
                  <button
                    onClick={() => handleStartEdit(product)}
                    className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Editar
                  </button>
                  {/* Botón Eliminar */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage;
