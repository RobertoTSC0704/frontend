
import { Link } from "react-router-dom";
import "./CatalogoPage.css"; // Archivo de estilos externos

function CatalogoPage() {
  // Datos dinámicos para los géneros
  const genres = [
    {
      name: "Corridos",
      description:
        "Los corridos son el género musical que más me gusta escuchar, me gusta mucho el estilo que tienen y el cómo narran sucesos, historias e incluso biografía de personas.",
      image: "images/corridos.jpg", // Coloca tus imágenes en la carpeta 'public/images'
    },
    {
      name: "Banda",
      description:
        "La banda es un género popular en México que se caracteriza por el uso de instrumentos variados. Nunca falta la música de banda en las fiestas o en los eventos.",
      image: "images/banda.jpg",
    },
    {
      name: "Electrónica",
      description:
        "La música electrónica combina varios sonidos y suele tener canciones muy movidas o relajadas, perfectas para entrenar fútbol.",
      image: "images/electronica.jpg",
    },
    {
      name: "Cumbia",
      description:
        "La cumbia es un género que escuchaba con mi abuelito, y me gusta mucho la combinación de los instrumentos y su ritmo.",
      image: "images/cumbia.jpg",
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
        <p>&copy; 2024 Mi Biografía Musical</p>
      </footer>
    </div>
  );
}

export default CatalogoPage;
