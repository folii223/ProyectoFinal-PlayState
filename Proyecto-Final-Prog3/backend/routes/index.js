const express = require('express');
const router = express.Router();
const {getGame, getGameByID, saveGame, deleteGame, saveState} = require('../controllers/game.controller');


// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba 1',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});


//Rutas de juego
router.post('/games', saveGame);
router.get('/games/:id', getGameByID);
router.get('/games', getGame);
router.delete('/games/:id' , deleteGame)

//Rutas de funcionalidades
router.put('/games/:id', saveState);

module.exports = router;
