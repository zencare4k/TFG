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

- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y obtiene un token JWT.

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

## Documentación y Pruebas con Postman

Se incluye una colección de Postman (`TFGBackend.json`) con todos los endpoints principales del backend para facilitar las pruebas y exploración de la API.

### ¿Cómo usar la colección de Postman?

1. Abre Postman.
2. Haz clic en "Importar" y selecciona el archivo `TFGBackend.json` que se encuentra en la raíz del proyecto (`Backend/TFGBackend.json`).
3. Una vez importada, tendrás acceso a todas las rutas agrupadas por funcionalidad: Auth, Users, Products y Wishlist.
4. Puedes configurar variables como `userId` y `productId` en el entorno de Postman para facilitar las pruebas de endpoints que requieren identificadores.
5. Asegúrate de que el servidor esté en ejecución (`npm start`) antes de realizar peticiones.

### Estructura de la colección

- **Auth**: Registro y login de usuarios.
- **Users**: CRUD de usuarios.
- **Products**: CRUD de productos.
- **Wishlist**: Añadir, consultar y eliminar productos de la wishlist de un usuario.

> Consulta los ejemplos de cuerpo de petición y variables en cada endpoint dentro de la colección.

------------------------------------
 Proyecto desarrollado como parte de la asignatura de Entorno Servidor.

