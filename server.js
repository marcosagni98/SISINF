// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

// Vincula la base de datos del router al servidor
app.db = router.db;

// Configuración de CORS
app.use(cors());

// Middlewares por defecto de json-server (logger, static, cors, no-cache)
app.use(jsonServer.defaults());

// Configuración de reglas de autorización
const rules = auth.rewriter({
  // Rutas protegidas:
  // 600: Solo el propietario puede acceder a /users
  // 660: Cualquier usuario autenticado puede acceder a estas rutas
  'users': 600,
  'historic': 660,
  'my-incidences': 660,
  'recent-incidences': 660,
  'user-happiness': 660,
  'average-incidences-resolution-time': 660,
  'active-incidences': 660
});

// Aplica las reglas de reescritura
app.use(rules);

// Middleware de autenticación
app.use(auth);

// Ruta de la API
app.use(router);

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});
