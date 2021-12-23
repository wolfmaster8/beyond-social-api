# Beyond Social API
* [Proyecto Kanban](https://github.com/users/wolfmaster8/projects/1/views/1)
* [Git Frontend](https://github.com/wolfmaster8/beyond-social-frontend)

## Tecnologías Utilizadas
* **NodeJS**
* **MySQL**
* **expressjs** : micro-framework para construcción de aplicaciones en NodeJS.
* **sequelize**: ORM. Herramienta que genera la conexión con la base de datos y provee métodos comunes para todos los datos.
* **jwt**: JSON Web Token. La autenticación de la aplicación utiliza tokens JWT verificar la autenticación de un usuario.


## Decisiones del proyecto
### Autenticación
* Usualmente utilizaria una biblioteca de autenticación o una tabla en la base de datos para controlar los tokens/sesiones de los usuarios. Por tiempo y por todas las funcionalidades adicionales que esto incluye decidí no implementar esto. Esto hace que los tokens no sean revocados aún así cuando el usuario haga logout desde el frontend. En este caso, tocaría esperar que el token expire.

### Subida de Archivos
* Usualmente utilizaria servicios como S3 de AWS o Blob Storage de Azure para subir archivos. En este caso, los archivos quedan de forma local en la API en la carpeta `uploads`.

## Configurando el Proyecto
### Requisitos
* **NodeJS**: versión 12 o mayor
* **yarn:** para instalar ejecuta `npm i -g yarn`
* **MySQL**: versión 5 u 8

### Configuración
1. Crear una base de datos en tu servidor MySQL local con el nombre `beyond_social`. O ejecutando el script ``CREATE SCHEMA `beyond_social` DEFAULT CHARACTER SET utf8mb4 ;``.
2. Copiar el archivo `.env.example` y renombrearlo como `.env` o `.env.local`.
   1. Reemplazar los valores (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`) con los valores de tu servidor de MySQL.
   2. Coloca un valor secreto en la key `APP_SECRET_KEY` (puede ser cualquier string). Esta llave es utilizada para generar los tokens de autenticación.
3. Instala las dependencias de node, ejecutando `yarn` o `npm i`.

### Ejecución
Para ejecutar la API en modo desarrollo, ejecuta en tu consola `yarn dev` o `npm run dev`.
Deberías ver un mensaje en la consola con la URL de la API.