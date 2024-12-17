
import { Link } from "react-router-dom";
import "./CatalogoPage.css"; // Archivo de estilos externos

function CatalogoPage() {
  // Datos dinámicos para los géneros
  const genres = [
    {
      name: "Botas Negras",
      description:
        "Estas elegantes botas negras combinan estilo y comodidad, perfectas tanto para el uso diario como para ocasiones especiales. Fabricadas con materiales de alta calidad, cuentan con una suela antiderrapante que ofrece excelente tracción y durabilidad..",
      image: "/Botas_Negras.png", // Coloca tus imágenes en la carpeta 'public/images'
    },
    {
      name: "Botas TL Cafés",
      description:
        "Las icónicas botas Timberland en color café ofrecen resistencia y estilo para cualquier ocasión. Confeccionadas en piel premium, son impermeables y cuentan con costuras selladas para mantener tus pies secos en todo momento.",
      image: "/BotasTL.jpg",
    },
    {
      name: "Botas Tacticas",
      description:
        ".Botas tácticas de alto rendimiento, diseñadas para brindar máxima resistencia, comodidad y soporte en terrenos difíciles. Fabricadas con materiales duraderos y transpirables, cuentan con una suela antiderrapante de alta tracción, ideal para uso en actividades al aire libre, trabajo pesado o entrenamientos.",
      image: "/Taticas.jpg",
    },
    {
      name: "Botas Vaqueras",
      description:
        "Auténticas botas vaqueras que fusionan tradición y estilo moderno. Elaboradas con piel genuina, cuentan con bordados detallados y una punta estilizada que resalta su elegancia. Su suela de cuero ofrece comodidad y durabilidad, ideales para fiestas, eventos o uso diario.",
      image: "/Vaquero.jpg",
    },
  ];

  return (
    <div className="catalogo-container">
      {/* Encabezado */}
      <header className="header">
        <h1>Intereses Musicales</h1>
        <p>Descubre mis géneros musicales favoritos</p>
      </header>

      {/* Barra de navegación */}
      <nav className="navbar">
        <Link to="/">Inicio</Link>
      </nav>

      {/* Contenido dinámico */}
      <main className="content">
        {genres.map((genre, index) => (
          <div className="genre" key={index}>
            <img src={genre.image} alt={genre.name} />
            <div>
              <h2>{genre.name}</h2>
              <p>{genre.description}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Pie de página */}
      <footer className="footer">
        <p>&copy; ROBOTAS Las Mejores Botas</p>
      </footer>
    </div>
  );
}

export default CatalogoPage;
