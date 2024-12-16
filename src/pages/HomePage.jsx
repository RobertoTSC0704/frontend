function HomePage() {
  return (
    <div
    style={{
      backgroundColor: "blue",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    }}
  >
    <div className="bg-white max-w-md w-full p-10 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold my-3 text-center text-indigo-600">
        </h1>
        <h2 className="text-xl font-medium my-3 text-center text-gray-700">
          Lenguajes Web
        </h2>
        <div>
          <p className="text-justify pt-5 mt-5 text-sm text-gray-600 leading-relaxed">
            Este sistema ha sido creado en la materia <span className="font-semibold text-indigo-500">Tópicos Selectos de Desarrollo Web</span>
            para la carrera en Ingeniería Informática. Proporciona herramientas modernas y eficientes para la gestión de productos.
          </p>
          <hr className="my-5 h-px bg-gradient-to-r from-indigo-400 to-blue-400 border-0" />
          <p className="text-center text-xs text-gray-500">
            DERECHOS RESERVADOS RTSC &#9400; 2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
