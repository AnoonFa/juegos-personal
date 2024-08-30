import React, { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './Tablas.css';

const GamesTable = () => {
  const { games } = useContext(GamesContext);
  const sortedGames = [...games].sort((a, b) => b.licensesSold - a.licensesSold);
  const [selectedTab, setSelectedTab] = useState('mas_vendido');
  const [hoveredGame, setHoveredGame] = useState(sortedGames[0] || null);
  const [visibleGamesCount, setVisibleGamesCount] = useState(5); // Número de juegos visibles por defecto
  const navigate = useNavigate();

  useEffect(() => {
    if (!hoveredGame && sortedGames.length > 0) {
      setHoveredGame(sortedGames[0]);
    }
  }, [hoveredGame, sortedGames]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setHoveredGame(getTabContent(tab)[0]); // Cambiar el juego seleccionado al cambiar de pestaña
  };

  const getTabContent = (tab) => {
    switch (tab) {
      case 'mas_vendido':
        return sortedGames;
      case 'ofertas':
        return games.filter((game) => game.discount > 0);
      default:
        return [];
    }
  };

  const toggleVisibleGames = () => {
    if (visibleGamesCount === 5) {
      setVisibleGamesCount(sortedGames.length);
    } else {
      setVisibleGamesCount(5);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="pagina-tabla">
      <div className="pestanas">
        <button className={`boton-pestana ${selectedTab === 'mas_vendido' ? 'activo' : ''}`} onClick={() => handleTabClick('mas_vendido')}>Más Vendido</button>
        <button className={`boton-pestana ${selectedTab === 'ofertas' ? 'activo' : ''}`} onClick={() => handleTabClick('ofertas')}>Ofertas</button>
      </div>
      <div className="contenedor-tabla">
        <div className="contenido-tabla">
          <table className="tabla-personalizada">
            <thead>
              <tr>
                <th>Juego</th>
                <th>Categoría</th>
                <th>Licencias Vendidas</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {getTabContent(selectedTab).slice(0, visibleGamesCount).length === 0 ? (
                <tr>
                  <td colSpan="4" className="tabla-vacia">
                    No hay juegos disponibles.
                  </td>
                </tr>
              ) : (
                getTabContent(selectedTab).slice(0, visibleGamesCount).map((game) => (
                  <tr
                    key={game.id}
                    className={hoveredGame && hoveredGame.id === game.id ? 'resaltado' : ''}
                    onMouseEnter={() => setHoveredGame(game)}
                    onClick={() => handleGameClick(game.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{game.name}</td>
                    <td>{game.category}</td>
                    <td>{game.licensesSold}</td>
                    <td>${game.price ? game.price.toFixed(2) : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pie-tabla">
            <button onClick={toggleVisibleGames} className="boton-alternar">
              {visibleGamesCount === 5 ? 'Ver más' : 'Ver menos'}
            </button>
          </div>
        </div>
        <div className={`info-juego ${hoveredGame ? 'info-resaltada' : ''}`}>
          {hoveredGame && (
            <>
              <h2 className='title'>{hoveredGame.name}</h2>
              <p>Categoría: {hoveredGame.category}</p>
              <p>Licencias Disponibles: {hoveredGame.licensesAvailable}</p>
              <p>Licencias Vendidas: {hoveredGame.licensesSold}</p>
              <div className="imagenes-juego">
                {hoveredGame.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={`${hoveredGame.name} ${index + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesTable;
