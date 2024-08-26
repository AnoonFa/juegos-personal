import React, { useContext, useState , useEffect} from 'react';
import { GamesContext } from '../../context/GameContext';
import './Library.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';
import { useAuth } from '../../context/AuthContext';



const Library = () => {
    const { games } = useContext(GamesContext);
    const { user } = useAuth(); // Get the current user
    const [filteredGames, setFilteredGames] = useState([]);
  
    useEffect(() => {
      // Filter games to only include the ones owned by the current user
      const userOwnedGames = games.filter(game => game.ownerId === user.uid); // Assuming each game has an `ownerId` field
      setFilteredGames(userOwnedGames);
    }, [games, user]);
  
    return (
      <div className="library-page">
        <div className="library-header">
          <h1>Biblioteca</h1>
        </div>
        <div className="library-content">
          <div className="filter-section">
            {/* Pass the user's games to the filter */}
            <SearchAndFilterBar allGames={filteredGames} setGames={setFilteredGames} />
          </div>
          <div className="games-grid">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-card">
                <img src={game.imageUrl} alt={game.name} />
                <h3>{game.name}</h3>
                <p>Categoría: {game.category}</p>
                <p>Licencias Disponibles: {game.licensesAvailable}</p>
                <p>Licencias Vendidas: {game.licensesSold}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Library;