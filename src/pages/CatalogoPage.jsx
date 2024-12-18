import "./CatalogoPage.css"; // Archivo de estilos externos

function CatalogoPage() {
  // Datos dinámicos para los géneros
  const genres = [
    {
      name: "Botas Negras",
      description:
        "Estas elegantes botas negras combinan estilo y comodidad, perfectas tanto para el uso diario como para ocasiones especiales. Fabricadas con materiales de alta calidad, cuentan con una suela antiderrapante que ofrece excelente tracción y durabilidad.",
      image: "/Botas_Negras.png", // Coloca tus imágenes en la carpeta 'public/images'
      link: "https://www.timberland.com.mx/botas-premium-waterproof-negro-tb012807001/p" // URL externa
    },
    {
      name: "Botas TL Cafés",
      description:
        "Las icónicas botas Timberland en color café ofrecen resistencia y estilo para cualquier ocasión. Confeccionadas en piel premium, son impermeables y cuentan con costuras selladas para mantener tus pies secos en todo momento.",
      image: "/BotasTL.jpg",
      link: "https://www.timberland.es/es-es/p/mujer-10086/botas-6-inch-impermeables-con-cordones-stone-street-para-mujer-en-amarillo-TB1A5RJD231"
    },
    {
      name: "Botas Tacticas",
      description:
        "Botas tácticas de alto rendimiento, diseñadas para brindar máxima resistencia, comodidad y soporte en terrenos difíciles. Fabricadas con materiales duraderos y transpirables, cuentan con una suela antiderrapante de alta tracción.",
      image: "/Taticas.jpg",
      link: "https://mx-empiretacticalgear.glopalstore.com/ua-mens-micro-g-valsetz-wide-tactical-boots-black/"
    },
    {
      name: "Botas Vaqueras",
      description:
        "Auténticas botas vaqueras que fusionan tradición y estilo moderno. Elaboradas con piel genuina, cuentan con bordados detallados y una punta estilizada que resalta su elegancia.",
      image: "/Vaquero.jpg",
      link: "https://www.amazon.com.mx/Vaquera-Mujer-Color-Tabaco-Goodyear/dp/B098HHY3Q1"
    },
    {
      name: "Botas Salomon",
      description:
        "El calzado que necesitas para proteger tus pies. Estabilidad y amortiguación, Agarre, Seguridad y sobre todo Comodidad.",
      image: "/Salomon.jpg",
      link: "https://www.calzzapato.com/botas-salomon-416250-gris-para-mujer-09GJQY"
    },
    {
      name: "Botas Caterpillar",
      description:
        "El calzado que necesitas para proteger tus pies. Estabilidad y amortiguación, Agarre, Seguridad y sobre todo Comodidad.",
      image: "/Cat.jpg",
      link: "https://www.kelder.mx/botas-caterpillar-725603-cafe-para-hombre-09HAHN"
    },
    {
      name: "Botas Militar",
      description:
        "Esta bota militar ofrece las características livianas más avanzadas de Rocky, así como la durabilidad y el rendimiento que necesita.",
      image: "/Militares.jpg",
      link: "https://mx-empiretacticalgear.glopalstore.com/rocky-lightweight-commercial-military-boot-coyote-brown/"
    },
    {
      name: "Botas Levis",
      description:
        "Esta bota militar ofrece las características livianas más avanzadas de Rocky, así como la durabilidad y el rendimiento que necesita.",
      image: "/Levis.jpg",
      link: "https://www.calzzapato.com/botas-levis-klein-para-hombre-09FZD6"
    },
  ];

  return (
    <div className="catalogo-container">
      {/* Encabezado */}
      <header className="header">
        <h1>RoBotas</h1>
        <p>Lo Mejor En Botas De México</p>
      </header>

      {/* Barra de navegación */}
      <nav className="navbar">
        <a href="/">Inicio</a>
      </nav>

      {/* Contenido dinámico */}
      <main className="content">
        {genres.map((genre, index) => (
          <div className="genre" key={index}>
            {/* Enlace hacia la URL externa al hacer clic en la imagen */}
            <a href={genre.link} target="_blank" rel="noopener noreferrer">
              <img src={genre.image} alt={genre.name} />
            </a>
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
