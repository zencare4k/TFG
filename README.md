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


## Documentación de la API con Postman

Se incluye una colección de Postman (`TFGBackend.json`) con todos los endpoints principales del backend. A continuación se detallan los endpoints y ejemplos de uso para facilitar las pruebas.

### Auth

- **Registrar usuario**
  - **POST** `/api/auth/register`
  - **Body (JSON):**
    ```json
    {
      "name": "usuario",
      "email": "usuario@example.com",
      "password": "123456",
      "isAdmin": false
    }
    ```
- **Login**
  - **POST** `/api/auth/login`
  - **Body (JSON):**
    ```json
    {
      "email": "usuario@example.com",
      "password": "123456"
    }
    ```

### Users

- **Obtener todos los usuarios**
  - **GET** `/api/users`
- **Crear usuario**
  - **POST** `/api/users`
  - **Body (JSON):**
    ```json
    {
      "name": "nuevo",
      "email": "nuevo@example.com",
      "password": "123456"
    }
    ```
- **Actualizar usuario**
  - **PUT** `/api/users/{{userId}}`
  - **Body (JSON):**
    ```json
    {
      "name": "actualizado"
    }
    ```
- **Eliminar usuario**
  - **DELETE** `/api/users/{{userId}}`

### Products

- **Obtener todos los productos**
  - **GET** `/api/products`
- **Obtener producto por ID**
  - **GET** `/api/products/{{productId}}`
- **Crear producto**
  - **POST** `/api/products`
  - **Body (JSON):**
    ```json
    {
      "name": "Producto",
      "description": "Descripción",
      "price": 10.5,
      "category": "General"
    }
    ```
- **Actualizar producto**
  - **PUT** `/api/products/{{productId}}`
  - **Body (JSON):**
    ```json
    {
      "name": "Producto actualizado"
    }
    ```
- **Eliminar producto**
  - **DELETE** `/api/products/{{productId}}`

### Wishlist

- **Añadir a wishlist**
  - **POST** `/api/wishlist`
  - **Body (JSON):**
    ```json
    {
      "userId": "{{userId}}",
      "productId": "{{productId}}"
    }
    ```
- **Obtener wishlist**
  - **GET** `/api/wishlist/{{userId}}`
- **Eliminar de wishlist**
  - **DELETE** `/api/wishlist/{{userId}}/{{productId}}`

### Variables de entorno en Postman

- `userId`: ID del usuario (rellenar tras crear/obtener un usuario)
- `productId`: ID del producto (rellenar tras crear/obtener un producto)

### Instrucciones de uso

1. Abre Postman.
2. Importa el archivo `TFGBackend.json` desde la raíz del backend.
3. Rellena las variables `userId` y `productId` según corresponda.
4. Realiza peticiones a los endpoints según la documentación anterior.

---

## NOTA: .env

Adjuntado a este proyecto, en su carpeta raiz, se deja un .rar en el cual esta el .env 
necesario para la ejecucion del backend, debe de ser depositado en la raiz del backend,
es decir , `/Backend`, el rar no contiene ningun tipo de contraseña.