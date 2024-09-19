import React, { useContext, useState, useEffect } from 'react';
import './SalesPage.css';
import Promotions from '../../components/Promotions/Promotions';
import Sales from '../../components/Sales/Sales';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import GameComparison from '../../components/GameComparison/GameComparison';
import { GamesContext } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext';
import SellerSales from '../../components/Sales/SellerSales';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SalesPage = () => {
  const { games } = useContext(GamesContext);
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState(null);
  const { setTitle } = usePageTitle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle('Ventas');
  }, [setTitle]);

  useEffect(() => {
    if (user && games.length > 0) {
      const userGames = games.filter(game => game.sellerId === user.id);
      if (userGames.length > 0) {
        setSelectedGame(userGames[0]); // Selecciona el primer juego del usuario
      } else {
        setSelectedGame(null); // No hay juegos del usuario
      }
    }
  }, [user, games]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="home">
     

      <Promotions />
      <SortedSalesTable />
      <div className='buttonss'>
      <Button   variant="contained" color="primary" onClick={handleOpen}>
        Agregar Juego
      </Button>
      </div>
        <div className="sales-comparison-container">
        <SellerSales />
        {selectedGame && <GameComparison selectedGame={selectedGame} />}
      </div>

      {/* Modal para mostrar el componente Sales */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-sales-title"
        aria-describedby="modal-sales-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            
            borderRadius: 2,
            width: '44%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Sales /> {/* Mostrar el componente Sales dentro del modal */}
        </Box>
      </Modal>
    </div>
  );
};

export default SalesPage;
