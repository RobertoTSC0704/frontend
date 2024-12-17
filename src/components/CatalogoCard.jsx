
import PropTypes from "prop-types";

function CatalogoCard({ title, description, image, onClick }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Imagen */}
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />

      {/* Contenido */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-zinc-800">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      {/* Acción opcional */}
      {onClick && (
        <div className="px-6 pt-4 pb-2">
          <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
}

// PropTypes para validación
CatalogoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CatalogoCard;
