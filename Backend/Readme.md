# Proyecto Final de Entorno Servidor

Este proyecto es el desarrollo de una API RESTful utilizando Node.js, Express y MongoDB. La API permite la gestión de usuarios y productos, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Además, se ha implementado autenticación y autorización utilizando JWT (JSON Web Tokens).

## Estructura del Proyecto


## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio/Backend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno en el archivo `.env`:
    ```properties
    MONGO_URI_USERS=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/users?retryWrites=true&w=majority
    MONGO_URI_PRODUCTS=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/products?retryWrites=true&w=majority
    PORT=5000
    JWT_SECRET=tu_secreto_jwt
    ADMIN_PASSWORD=tu_contraseña_admin
    NODE_ENV=development
    ```

## Uso

1. Inicia el servidor:
    ```sh
    npm start
    ```

2. La API estará disponible en `http://localhost:5000/api`.

## Endpoints

### Autenticación
- `GET /api/users`: Obtiene todos los usuarios.
- `GET /api/users/:id`: Obtiene un usuario por ID.
- `POST /api/users`: Crea un nuevo usuario.
- `PUT /api/users/:id`: Actualiza un usuario por ID.
- `DELETE /api/users/:id`: Elimina un usuario por ID.
### Usuarios

- `GET /api/users`: Obtiene todos los usuarios.
- `GET /api/users/:id`: Obtiene un usuario por ID.
- `PUT /api/users/:id`: Actualiza un usuario por ID.
- `DELETE /api/users/:id`: Elimina un usuario por ID.

### Productos

- `GET /api/products`: Obtiene todos los productos.
- `GET /api/products/:id`: Obtiene un producto por ID.
- `POST /api/products`: Crea un nuevo producto.
- `PUT /api/products/:id`: Actualiza un producto por ID.
- `DELETE /api/products/:id`: Elimina un producto por ID.

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm test
```
## Cobertura de Código
La cobertura de código se genera automáticamente después de ejecutar las pruebas. Puedes encontrar el informe de cobertura en la carpeta coverage/lcov-report/index.html.

## Documentación de la API
La documentación de la API se genera automáticamente utilizando Swagger. Puedes acceder a la documentación en http://localhost:5000/api/docs.

------------------------------------
 Proyecto desarrollado como parte de la asignatura de Entorno Servidor.

