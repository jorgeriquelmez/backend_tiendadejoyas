# ✨ Backend Tienda de Joyas ✨

Este repositorio contiene la API REST para la gestión de un inventario de joyas. Permite obtener joyas con diversas opciones de paginación y ordenamiento, así como filtrar el inventario por precios, categorías y metales.

---

## 🚀 Características

- **Listado de Joyas:** Obtiene todas las joyas del inventario con soporte para paginación (`page`, `limits`) y ordenamiento (`order_by`).
- **Filtrado Avanzado:** Permite filtrar joyas por rango de precios (`precio_min`, `precio_max`), categoría (`categoria`) y tipo de metal (`metal`).
- **Validación de Parámetros:** Incluye un middleware para validar los parámetros de consulta (`page`, `limits`, `order_by`, `precio_min`, `precio_max`, `categoria`, `metal`), asegurando la integridad de las peticiones.
- **Información Agregada:** Las respuestas incluyen el total de joyas encontradas (`totalJoyas`) y el stock total (`stockTotal`) para la consulta realizada.
- **Base de Datos PostgreSQL:** Almacenamiento persistente del inventario.

---

## 💻 Tecnologías Utilizadas

### Backend (API REST)

- **Node.js:** Entorno de ejecución JavaScript.
- **Express.js:** Framework web para Node.js, utilizado para construir la API REST.
- **`pg` (Node-PostgreSQL):** Driver para interactuar directamente con bases de datos PostgreSQL.
- **`dotenv`:** Para gestionar variables de entorno (`.env`).
- **`cors`:** (Asumido, común para APIs REST) Middleware para habilitar Cross-Origin Resource Sharing.
- **Base de Datos:** PostgreSQL

---

## 📁 Estructura del Proyecto

backend_tiendadejoyas/
├── config/
│ └── config.js # Configuración de la conexión a la base de datos  
├── controllers/  
│ └── joyasController.js # Lógica de manejo de solicitudes HTTP para joyas  
├── helpers/  
│ └── hateoas.js # Funciones de transformación de respuesta (incluido HATEOAS)  
├── middlewares/  
│ └── validateJoyasQueryParams.js # Middleware para validación de parámetros de consulta  
├── models/  
│ └── joyasModel.js # Lógica de interacción con la base de datos para joyas  
├── routes/  
│ └── joyasRoutes.js # Definición de las rutas de la API para joyas  
├── .env.example # Ejemplo de archivo de variables de entorno  
├── package.json # Metadatos y dependencias del proyecto  
└── server.js # Punto de entrada principal de la aplicación

---

## ⚙️ Configuración y Ejecución

Sigue estos pasos para poner la aplicación en marcha.

### 1. Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/es/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/get-npm) (viene con Node.js) o [Yarn](https://yarnpkg.com/lang/en/docs/install/)
- [PostgreSQL](https://www.postgresql.org/download/) (servidor de base de datos)

### 2. Configuración de la Base de Datos

1.  Abre tu cliente de PostgreSQL (pgAdmin, psql, DBeaver, etc.).
2.  Crea una nueva base de datos. Puedes llamarla `tiendajoyas_db` (o el nombre que prefieras).
3.  Ejecuta la siguiente sentencia SQL para crear la tabla `inventario`:

    ```sql
    CREATE TABLE inventario (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        metal VARCHAR(50) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0
    );
    ```

    **(Opcional) Datos de ejemplo para `inventario`:**

    ```sql
    INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES
    ('Anillo Wish', 'anillo', 'plata', 30000, 4),
    ('Collar History', 'collar', 'oro', 60000, 2),
    ('Aros Berry', 'aros', 'plata', 25000, 10),
    ('Pulsera Shine', 'pulsera', 'oro', 45000, 5),
    ('Anillo Eternity', 'anillo', 'oro', 55000, 3);
    ```

### 3. Configuración del Backend

1.  Navega a la carpeta raíz de tu proyecto `backend_tiendadejoyas/` en tu terminal:
    ```bash
    cd backend_tiendadejoyas
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz de la carpeta `backend_tiendadejoyas/` con tus credenciales de PostgreSQL:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=tu_usuario_postgres
    DB_PASSWORD=tu_contraseña_postgres
    DB_NAME=tiendajoyas_db
    PORT=3000 # Puerto donde correrá el backend
    ```
    _(Asegúrate de reemplazar los valores con tu propia configuración de PostgreSQL)._
4.  Inicia el servidor backend:
    ```bash
    node --watch server.js
    ```
    El servidor se ejecutará en `http://localhost:3000` (o el puerto que hayas configurado en `PORT`).

---

## 🏃 Uso (Endpoints de la API)

Una vez que el servidor backend esté corriendo, puedes realizar peticiones a los siguientes endpoints:

### 1. Obtener todas las joyas

- **Ruta:** `GET /joyas`
- **Parámetros de consulta (Query Params):**

  - `page`: Número de página (ej. `1`). Por defecto: `1`.
  - `limits`: Cantidad de elementos por página (ej. `10`). Por defecto: `10`.
  - `order_by`: Campo y dirección para ordenar (ej. `precio_DESC`, `nombre_ASC`). Campos permitidos: `id`, `nombre`, `categoria`, `metal`, `precio`, `stock`. Direcciones: `ASC`, `DESC`. Por defecto: `id_ASC`.

- **Ejemplos:**
  - `http://localhost:3000/joyas`
  - `http://localhost:3000/joyas?page=2&limits=5`
  - `http://localhost:3000/joyas?order_by=precio_DESC`

### 2. Obtener joyas con filtros

- **Ruta:** `GET /joyas/filtros`
- **Parámetros de consulta (Query Params):**

  - `precio_min`: Precio mínimo (ej. `25000`).
  - `precio_max`: Precio máximo (ej. `50000`).
  - `categoria`: Categoría de la joya (ej. `anillo`, `collar`, `aros`, `pulsera`).
  - `metal`: Tipo de metal (ej. `oro`, `plata`, `bronce`).

- **Ejemplos:**
  - `http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=40000`
  - `http://localhost:3000/joyas/filtros?categoria=anillo&metal=plata`
  - `http://localhost:3000/joyas/filtros?precio_min=20000&categoria=collar`
