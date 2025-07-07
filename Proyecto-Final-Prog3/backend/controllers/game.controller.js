const {Game} = require('../models')

const getGameByID = async (req,res) => {
    try {
        const {id} = req.params;
        const games = await Game.findByPk(id);

        if(!games){
            return res.status(404).json({error:"Juego no encontrado"})
        }

        res.json({games})
    }
    catch(error){
        res.status(500).json({error:"Error trayendo el juego", message: error.message})
    }
};

const saveGame = async (req, res) => {
  try {
    const { id, title, image, genres } = req.body;
    const [game, created] = await Game.findOrCreate({
      where: { id },
      defaults: { title, image, genres }
    });

    if (created) {
      res.status(201).json({ message: "Juego guardado exitosamente", game });
    } else {
      res.status(200).json({ message: "El juego ya existía en la base de datos", game });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo guardar el juego", message: error.message });
  }
};

module.exports = {
    getGameByID,
    saveGame
}