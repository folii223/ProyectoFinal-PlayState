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

const getGame = async (req, res) => {
  try{
    const games = await Game.findAll();
      res.json({games})
  }catch(error){
    res.status(404).json({error:"No se encontraron los juegos"})
  }
}

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
      res.status(200).json({ message: "El juego ya existe en tu biblioteca", game });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo guardar el juego", message: error.message });
  }
};

const deleteGame = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Game.destroy({
        where: {id:id}
      });

      if(deleted){
        res.status(200).json({message: "Elemento eliminado correctamente"});
      }
      else {
        res.status(404).json({message: "Juego no encontrado"})
      }
    }catch(error){
      console.log("Error al eliminar el juego", error);
      res.status(500).json({message: "Error interno del servidor"});
    }
}

module.exports = {
    getGameByID,
    saveGame,
    getGame, 
    deleteGame
}