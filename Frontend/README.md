# Sprint 3

## Ejercicio 2: funcionalidad libre

### Historia de Usuario 1: Wishlist

#### Título: Wishlist

#### Descripción:
"Como usuario, quiero poder agregar productos a una lista de deseos para poder revisarlos y comprarlos más tarde."

#### Criterios de Aceptación:
1. Dado que el usuario está navegando por los productos, la funcionalidad deberá permitir agregar un producto a la lista de deseos de manera clara. Cuando el usuario haga clic en el botón "Añadir a la lista de deseos", el sistema deberá agregar el producto a la lista de deseos. Entonces, el producto aparecerá en la lista de deseos del usuario, garantizando que no se añada más de una vez.
2. Dado que el usuario tiene productos en la lista de deseos, la funcionalidad deberá permitir eliminar un producto de la lista de deseos de manera clara. Cuando el usuario haga clic en el botón "Eliminar de la lista de deseos", el sistema deberá eliminar el producto de la lista de deseos. Entonces, el producto ya no aparecerá en la lista de deseos del usuario.
3. Dado que el usuario está navegando por la página, la funcionalidad deberá mostrar un icono de lista de deseos flotante en la esquina superior izquierda. Cuando el usuario haga clic en el icono, el sistema deberá mostrar la lista de deseos en una ventana flotante. Entonces, el usuario podrá ver y gestionar su lista de deseos fácilmente.

#### Diseño:
- Mockups de la lista de deseos y el icono flotante.
- Descripción detallada de los componentes `Wishlist`, `FloatingWishlistIcon` y `ProductCard`.

#### Implementación:
- Modificaciones en `src/App.js` para manejar la lógica de la lista de deseos.
- Creación de los componentes `Wishlist` y `FloatingWishlistIcon`.
- Actualización del componente `ProductCard` para reflejar el estado de la lista de deseos.
- Estilos CSS para el icono flotante y la ventana de la lista de deseos.

#### Pruebas:
1. Caso de prueba 1: Verificar que un producto se puede agregar a la lista de deseos.
   - **Descripción**: Navegar a la página de productos, seleccionar un producto y hacer clic en "Añadir a la lista de deseos". Verificar que el producto aparece en la lista de deseos y que no se puede añadir más de una vez.
   - **Resultado Esperado**: El producto se añade a la lista de deseos y el botón "Añadir a la lista de deseos" se desactiva para ese producto.
   - **GIF**: ![Caso de prueba 1](public\assets\images\Prueba1Ej2Funcion1.gif)
2. Caso de prueba 2: Verificar que un producto se puede eliminar de la lista de deseos.
   - **Descripción**: Navegar a la lista de deseos, seleccionar un producto y hacer clic en "Eliminar de la lista de deseos". Verificar que el producto se elimina de la lista de deseos y que se puede volver a añadir.
   - **Resultado Esperado**: El producto se elimina de la lista de deseos y el botón "Añadir a la lista de deseos" se activa nuevamente para ese producto.
   - **GIF**: ![Caso de prueba 2](public\assets\images\Prueba2Ej2Funcion1.gif)
3. Caso de prueba 3: Verificar que el icono de la lista de deseos muestra la ventana flotante correctamente.
   - **Descripción**: Navegar a la página principal y hacer clic en el icono de la lista de deseos en la esquina superior izquierda. Verificar que la ventana flotante de la lista de deseos se muestra correctamente con los productos añadidos.
   - **Resultado Esperado**: La ventana flotante de la lista de deseos se muestra correctamente con los productos añadidos.
   - **GIF**: ![Caso de prueba 3](public\assets\images\Prueba3Ej2Funcion1.gif)

### Historia de Usuario 2: Chat con Opciones Disponibles

#### Título: Chat con Opciones Disponibles

#### Descripción:
"Como usuario, quiero poder interactuar con un chat que me ofrezca cuatro opciones disponibles para obtener respuestas rápidas a mis preguntas sobre productos y servicios."

#### Criterios de Aceptación:
1. Dado que el usuario necesita asistencia, la funcionalidad deberá permitir abrir el chat de manera clara. Cuando el usuario haga clic en el icono de chat, el sistema deberá abrir la ventana de chat. Entonces, el usuario podrá ver las opciones disponibles.
2. Dado que el usuario está interactuando con el chat, la funcionalidad deberá permitir seleccionar una opción de manera clara. Cuando el usuario haga clic en una opción, el sistema deberá mostrar la respuesta correspondiente. Entonces, el usuario podrá obtener la información que necesita.
3. Dado que el usuario está utilizando el chat, la funcionalidad deberá mostrar el historial de la conversación de manera clara. Cuando el usuario seleccione una opción, el sistema deberá actualizar el historial de la conversación. Entonces, el usuario podrá ver toda la conversación en la ventana de chat.

#### Diseño:
- Mockups de la ventana de chat con opciones disponibles.
- Descripción detallada del componente `CostumerChat`.

#### Implementación:
- Creación del componente `CostumerChat`.
- Implementación de las cuatro opciones disponibles en el chat.
- Estilos CSS para la ventana de chat.

#### Pruebas:
1. Caso de prueba 1: Verificar que el chat se puede abrir correctamente.
   - **Descripción**: Navegar a la página principal y hacer clic en el icono de chat. Verificar que la ventana de chat se abre correctamente y muestra las opciones disponibles.
   - **Resultado Esperado**: La ventana de chat se abre correctamente y muestra las opciones disponibles.
   - **GIF**: ![Caso de prueba 1](public\assets\images\Prueba1Ej2Funcion2.gif)
2. Caso de prueba 2: Verificar que las opciones se pueden seleccionar y mostrar la respuesta correspondiente.
   - **Descripción**: Abrir la ventana de chat, seleccionar una de las opciones disponibles y verificar que se muestra la respuesta correspondiente en el historial de la conversación.
   - **Resultado Esperado**: La opción seleccionada muestra la respuesta correspondiente en el historial de la conversación.
   - **GIF**: ![Caso de prueba 2](public\assets\images\Prueba2Ej2Funcion2.gif)
3. Caso de prueba 3: Verificar que el historial de la conversación se muestra correctamente.
   - **Descripción**: Interactuar con el chat seleccionando varias opciones y verificar que el historial de la conversación se actualiza correctamente con las opciones seleccionadas y las respuestas correspondientes.
   - **Resultado Esperado**: El historial de la conversación se muestra correctamente con las opciones seleccionadas y las respuestas correspondientes.
   - **GIF**: ![Caso de prueba 3](public\assets\images\Prueba3Ej2Funcion2.gif)

### Historia de Usuario 3: Enviar Mensajes de Atención al Cliente

#### Título: Enviar Mensajes de Atención al Cliente

#### Descripción:
"Como usuario, quiero poder enviar mensajes de atención al cliente en una página aparte para resolver mis problemas y consultas."

#### Criterios de Aceptación:
1. Dado que el usuario necesita asistencia, la funcionalidad deberá permitir acceder a la página de atención al cliente de manera clara. Cuando el usuario haga clic en el enlace de atención al cliente, el sistema deberá redirigir al usuario a la página de atención al cliente. Entonces, el usuario podrá ver el formulario de contacto.
2. Dado que el usuario está en la página de atención al cliente, la funcionalidad deberá permitir enviar un mensaje de manera clara. Cuando el usuario complete el formulario y haga clic en "Enviar", el sistema deberá enviar el mensaje al equipo de atención al cliente. Entonces, el usuario verá una confirmación de que su mensaje ha sido enviado.
3. Dado que el usuario ha enviado un mensaje, la funcionalidad deberá permitir recibir una respuesta de manera clara. Cuando el equipo de atención al cliente responda al mensaje, el sistema deberá notificar al usuario. Entonces, el usuario podrá ver la respuesta en su correo electrónico.

#### Diseño:
- Mockups de la página de atención al cliente y el formulario de contacto.
- Descripción detallada del componente `SupportPage`.

#### Implementación:
- Creación del componente `SupportPage`.
- Integración con un servicio de correo electrónico para enviar y recibir mensajes.
- Estilos CSS para la página de atención al cliente y el formulario de contacto.
- Uso de Render para poder implementar la api de nodemailer en el proyecto

#### Pruebas:
1. Caso de prueba 1: Verificar que se puede acceder a la página de atención al cliente correctamente.
   - **Descripción**: Navegar a la página principal y hacer clic en el enlace de atención al cliente. Verificar que el sistema redirige al usuario a la página de atención al cliente y muestra el formulario de contacto.
   - **Resultado Esperado**: El sistema redirige al usuario a la página de atención al cliente y muestra el formulario de contacto.
   - **GIF**: ![Caso de prueba 1](path/to/your/gif7.gif)
2. Caso de prueba 2: Verificar que se puede enviar un mensaje de atención al cliente correctamente.
   - **Descripción**: Completar el formulario de contacto en la página de atención al cliente y hacer clic en "Enviar". Verificar que el sistema envía el mensaje al equipo de atención al cliente y muestra una confirmación de envío.
   - **Resultado Esperado**: El sistema envía el mensaje al equipo de atención al cliente y muestra una confirmación de envío.
   - **GIF**: ![Caso de prueba 2](path/to/your/gif8.gif)
3. Caso de prueba 3: Verificar que se recibe una respuesta del equipo de atención al cliente correctamente.
   - **Descripción**: Enviar un mensaje de atención al cliente y esperar una respuesta. Verificar que el sistema notifica al usuario cuando se recibe una respuesta y que la respuesta se muestra en el correo electrónico del usuario.
   - **Resultado Esperado**: El sistema notifica al usuario cuando se recibe una respuesta y la respuesta se muestra en el correo electrónico del usuario.
   - **GIF**: ![Caso de prueba 3](path/to/your/gif9.gif)