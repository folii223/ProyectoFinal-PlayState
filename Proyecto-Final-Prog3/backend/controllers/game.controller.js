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
    const { id, title, image, genres, state, comment, hoursplayed } = req.body;
    const [game, created] = await Game.findOrCreate({
      where: { id },
      defaults: { title, image, genres, state, comment, hoursplayed }
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
      const {id} = req.params;
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

const saveState = async(req,res) =>{
  try {
    const {id} = req.params;
    const {state, hoursplayed} = req.body;
    const [stateSaved] = await Game.update(
      {state:state},
      {where: {id:id}}
    );

    if (stateSaved !== 0) {
      res.status(200).json({message: "Estado actualizado correctamente:", state, "Horas actualizadas correctamente! ":hoursplayed, "Juego con id": id});
    }

  } catch (error) {
    console.log("Error al guardar el estado");
    res.status(500).json({message: "No se pudo guardar el estado"})
  }
}
//Agrego el controller para guardar el comentario
const saveComment = async(req,res) =>{
  try {
    const {id} = req.params;
    const {comment} = req.body;
    
    console.log("Guardando comentario:", comment, "para juego:", id);
    
    const [commentSaved] = await Game.update(
      {comment: comment},
      {where: {id: id}}
    );

    if (commentSaved !== 0) {
      res.status(200).json({message: "Comentario guardado correctamente", comment, "Juego con id": id});
    } else {
      res.status(404).json({message: "Juego no encontrado"});
    }

  } catch (error) {
    console.log("Error al guardar el comentario:", error);
    res.status(500).json({message: "No se pudo guardar el comentario"})
  }
}


module.exports = {
    getGameByID,
    saveGame,
    getGame, 
    deleteGame,
    saveState,
    saveComment
}