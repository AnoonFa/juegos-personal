import React, { useState, useContext } from 'react';
import './Sales.css';
import { GamesContext } from '../../context/GameContext'; // Importar contexto de juegos
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const UserGames = ({ games, userId }) => {
  const { updateGameLicenses } = useContext(GamesContext); // Contexto para actualizar juegos
  const [showMore, setShowMore] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [licensesToAdd, setLicensesToAdd] = useState(0);

  const userGames = games.filter(game => game.sellerId === userId && game.licensesAvailable > 0);
  const displayedGames = showMore ? userGames : userGames.slice(0, 3);

  // Abrir el modal para agregar licencias
  const handleOpen = (game) => {
    setSelectedGame(game);
    setOpen(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setLicensesToAdd(0);
  };

  // Manejar la adición de licencias
  const handleAddLicenses = async () => {
    if (!selectedGame || licensesToAdd <= 0) {
      setAlertMessage('Por favor, ingresa un número válido de licencias.');
      setAlertType('error');
      handleClose();
      return;
    }

    try {
      // Actualizar licencias en la base de datos
      const response = await axios.patch(`http://localhost:3000/games/${selectedGame.id}`, {
        licensesAvailable: selectedGame.licensesAvailable + licensesToAdd,
      });

      if (response.status === 200) {
        updateGameLicenses(selectedGame.id, licensesToAdd, false); // Actualizar en el contexto local
        setAlertMessage(`¡Se han agregado ${licensesToAdd} licencias a ${selectedGame.name} exitosamente!`);
        setAlertType('success');
      } else {
        throw new Error('Error al actualizar las licencias.');
      }
    } catch (error) {
      setAlertMessage('Error al agregar licencias: ' + error.message);
      setAlertType('error');
    }

    handleClose();
  };

  return (
    <div className="existing-games">
      <h2>Tus Juegos</h2>

      {/* Mostrar alerta si hay un mensaje */}
      {alertMessage && (
        <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
          <Alert severity={alertType} onClose={() => setAlertMessage('')}>
            {alertMessage}
          </Alert>
        </Stack>
      )}

      {displayedGames.length > 0 ? (
        displayedGames.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.coverImageUrl || game.logoUrl} alt={game.name} />
            <h3>{game.name}</h3>
            <button 
              className='agregarlicencias' 
              onClick={() => handleOpen(game)}
            >
              Agregar más licencias
            </button>
          </div>
        ))
      ) : (
        <p>No tienes juegos disponibles para vender.</p>
      )}
      {userGames.length > 3 && (
        <button className="mostrar-mas" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      )}

      {/* Modal para ingresar la cantidad de licencias */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          p: 4, 
          borderRadius: 2 
        }}>
          <h2 id="modal-title" style={{ color: 'black' }}>Agregar Licencias</h2> {/* Título en negro */}
          <TextField
            type="number"
            label="Cantidad de Licencias"
            value={licensesToAdd}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setLicensesToAdd(value > 0 ? value : 0); // Prevenir números negativos
            }}
            fullWidth
            margin="normal"
            inputProps={{ min: 0 }} // Asegura que no se puedan ingresar números negativos
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddLicenses}
            fullWidth
          >
            Agregar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserGames;
