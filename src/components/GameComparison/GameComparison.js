import React, { useContext, useState } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import './GameComparison.css';
import { Box, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

const GameComparison = () => {
  const { games } = useContext(GamesContext);
  const { user } = useAuth();
  const [firstGame, setFirstGame] = useState(null);
  const [secondGame, setSecondGame] = useState(null);

  // Filtrar los juegos que el usuario posee
  const userGames = games.filter(game => game.sellerId === user.id);

  // Verificar si los juegos del usuario están cargados
  if (!userGames || userGames.length === 0) {
    return <p>No tienes juegos disponibles para comparar.</p>;
  }

  // Función para manejar la selección de los juegos
  const handleSelectGame = (setGame, gameId) => {
    const selectedGame = userGames.find(game => game.id === gameId);
    setGame(selectedGame);
  };

  // Filtro para evitar seleccionar el mismo juego en ambos selectores
  const filteredGames = userGames.filter(game => game !== firstGame);

  return (
    <div className="game-comparison">
      <Typography variant="h4" gutterBottom className="comparison-title">
        Comparativa de Juegos
      </Typography>

      {/* Selectores para escoger los juegos a comparar */}
      <Box className="game-selectors">
        <FormControl fullWidth variant="outlined" className="selector">
          <InputLabel className="custom-label">Seleccione el primer juego</InputLabel>
          <Select
            value={firstGame ? firstGame.id : ''}
            onChange={(e) => handleSelectGame(setFirstGame, e.target.value)}
            label="Seleccione el primer juego"
            sx={{ 
              color: 'white', 
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '.MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            {userGames.map(game => (
              <MenuItem key={game.id} value={game.id}>
                {game.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" className="selector">
          <InputLabel className="custom-label">Seleccione el segundo juego</InputLabel>
          <Select
            value={secondGame ? secondGame.id : ''}
            onChange={(e) => handleSelectGame(setSecondGame, e.target.value)}
            label="Seleccione el segundo juego"
            disabled={!firstGame}
            sx={{ 
              color: 'white', 
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '.MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            {filteredGames.map(game => (
              <MenuItem key={game.id} value={game.id}>
                {game.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mostrar la comparación de los juegos seleccionados */}
      {firstGame && secondGame && (
        <Box className="comparison-result">
          <Box className="comparison-item">
            <Typography variant="h5">{firstGame.name}</Typography>
            <Typography>Precio: ${firstGame.price}</Typography>
            <Typography>Tamaño: {firstGame.size} KB</Typography>
            <Typography>Licencias Disponibles: {firstGame.licensesAvailable}</Typography>
            <Typography>Licencias Vendidas: {firstGame.licensesSold}</Typography>
          </Box>

          <Box className="comparison-item">
            <Typography variant="h5">{secondGame.name}</Typography>
            <Typography>Precio: ${secondGame.price}</Typography>
            <Typography>Tamaño: {secondGame.size} KB</Typography>
            <Typography>Licencias Disponibles: {secondGame.licensesAvailable}</Typography>
            <Typography>Licencias Vendidas: {secondGame.licensesSold}</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default GameComparison;
