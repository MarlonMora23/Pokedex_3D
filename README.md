## Desarrollado por Marlon Mora.

El proyecto consume la API de pokeAPI y muestra los pokemones en el orden predeterminado que da la API.

Se va mostrando de a 10 pokemones para lograr el renderizado de las figuras 3D. Para ver los demás está la paginación.

El proyecto incluye la lista de los pokemenos y al darle click a uno se ve los detalles del mismo.

Para conectar la API se creó un componente pokemonAPI en el que se hace toda la lógica del llamado a la API por id o nombre.
La petición hecha es un GET  a https://pokeapi.co/api/v2/pokemon/

Las figuras fueron para cada elemento fueron escojidas un poco al azar aunque buscando tambien la coherencia como que el fuego
se puede ver como una flama mediante un cono o que el agua puede ser una gota entonces por eso es una esfera.