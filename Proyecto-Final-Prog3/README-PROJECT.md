### PROYECTO FINAL - PROGRAMACION III
## TEMA ELEGIDO: *API LIBRERIA DE VIDEOJUEGOS*


### INTEGRANTES: 
- Antunez Agustin 
- Folik Hernan
- Zanconi Gian 

## EJECUCION DEL PROYECTO

1. Abrir Docker Desktop
2. Entrar a la carpeta llamada ***Proyecto-Final-Prog3***
3. Aplicar en la terminal de VS el comando: ***docker-compose up***
4. Si sale todo bien deberia mostrar esta pantalla al finalizar: 
![compiled-success](/Proyecto-Final-Prog3/capturas-proyecto/compiled-success.png)
5. Entramos a la ruta local: *http://localhost:3000*

**IMPORTANTE**: Si por casualidad no llegara a responder el contenedor del frontend en docker desktop es porque por algun motivo no instala react-scripts, entonces lo que se deberia hacer en ese caso es: 
- Ingresar a la carpeta frontend desde la consola de VS
- Ejecutar el comando: ***npm i react-scripts@latest*** (Sin eliminar las vulnerabilidades)
- Bajar docker y borrar volumenes con el comando: ***docker-compose down -v***
- Volver a construir el contenedor con: ***docker-compose build***
- Una vez que termine deberia aparecer la compilacion como se ve en la imagen de arriba.

## RECURSOS UTILIZADOS

**FRONTEND**
Para este proyecto utilizamos una API externa proveniente de una pagina llamada RAWG. Donde consumimos gran parte de la informacion como:
- Titulo del juego
- Imagen ilustrativa
- descripcion
- generos
- fecha de lanzamiento
- Calificacion global
- Horas totales 

A continuacion dejamos el link de la pagina:
API RAWG: https://rawg.io/apidocs

**BACKEND**

Para este apartado utilizamos el MVC para mantener el codigo lo mas ordenado posible como se enseño en la catedra. 

### Models

Este contiene el modelo **"Game"** el cual va a generar la tabla en la base de datos a traves de la migracion del mismo.

### Controller

Aca es donde van a estar todas las funcionalidades necesarias para que pueda:
- Guardar juego en la base de datos
- Consultar lista de juegos guardados
- Consultar juego por id 
- Eliminar juego de la base de datos
- Guardar comentario
- Guardar y modificar estado/horas

### Routes

Esta carpeta solamente contiene el archivo index.js (ya creado anteriormente), donde van a estar las rutas necesarias para luego probar las funcionalidades con Postman.

![routes-back](/Proyecto-Final-Prog3/capturas-proyecto/routes-back.png)

**DATABASE**

Los datos son almacenados en POSTGRES (***http://localhost:5050***), el cual solamente tiene una sola tabla llamada **"Games"**. Esta tabla guarda:
- ID (API RAWG)
- Titulo
- Imagen
- Generos
- Estado
- Horas jugadas
- Comentarios

**DATO IMPORTANTE**: Si se entra a la base de datos, posiblemente pida un usuario y una contraseña:

- Usuario: **app_user**
- Contraseña: **app_password**

Una vez que estamos dentro vamos a poder entrar a ver la tabla, la cual se veria de esta manera:

![database-table](/Proyecto-Final-Prog3/capturas-proyecto/database-table.png)

## COMO FUNCIONA?

Al entrar a la ruta te vas a encontrar con una lista de videojuegos donde cada uno va tener: 
- Una opcion de guardado que dirige al juego directamente a la biblioteca. ![markdown-icon](/Proyecto-Final-Prog3/capturas-proyecto/markdown-icon.png)
- Su propia informacion al hacer click en uno de ellos. 
- Un barra de navegacion donde vas a poder buscar juegos por categorias o directamente colocando el nombre en la barra de busqueda.

### VISTA DE INFORMACION DEL JUEGO

![INFO-GAME](/Proyecto-Final-Prog3/capturas-proyecto/info-game.png)


**Si el juego esta guardado en biblioteca**, a esta vista se le agregan las funcionalidades de:
- Comentar juego
- registro de horas y estado de juego

![INFO-GAME-LIBRARY](/Proyecto-Final-Prog3/capturas-proyecto/info-game-library.png)

### COMENTAR JUEGO

Este apartado tiene dos funcionalidades:
- Registrar el comentario en la base de datos
- Editar comentario.

Cuando colocamos un comentario y lo enviamos el input se bloquea para que no se pueda escribir y a su vez aparece el boton de editar, lo que da la libertad de habilitar el input y cambiar el comentario. 

### REGISTRO DE ESTADO Y HORAS JUGADAS

En esta seccion vamos a poder registrar el avance del juego mediante 3 opciones:
- Pendiente
- Iniciado
- Completado

Si el juego tiene estado pendiente el input para marcar las horas queda bloqueado en 0. 
Una vez que seleccionas el estado iniciado el input se desbloquea para poder marcar las horas jugadas. Pero si colocas el estado de completado el input se vuelve a bloquear y se ponen las horas totales traidas desde la API de RAWG.

Una vez registrado el estado y las horas, **en la biblioteca se marcaran tambien los cambios**.

![library](/Proyecto-Final-Prog3/capturas-proyecto/library.png)

## CONCLUSIONES

Este proyecto se encarga de llevar a cabo un registro de los juegos que se han guardado, mas que nada para tener un control y una lista definida de aquellos juegos que te gustaron o no, algo asi como un diario personal. Espero que les guste probar este proyecto tanto como nos gusto a nosotros llevarlo a cabo.
