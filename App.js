const express = require('express');
const app = express();
const port = 3000;
// Importo routerPosts
const routerPosts = require('./routers/routerPosts');

// importo middleware di checkTime
const checkTime = require("./middlewares/checkTime");

// importo middleware di gestione errore interni server 500
const errorsHandler = require('./middlewares/errorsHandler');

// importo middleware di gestione errore di chiamata su rotta inesistente 404
const notFound = require('./middlewares/notFound');

app.use(express.json());
//register the static assest
app.use(express.static('public'))

// registra globalmente il middleware di gestione
app.use(checkTime);


// Create the first route (home)
app.get('/', (req, res) => {
  res.json({ message: 'Server del mio blog!'});
});

// rotte di CRUD
app.use('/posts', routerPosts);
// registra globalmente il middleware di gestione chiamata su rotta inesistente 404
app.use(notFound);

// registra il middleware di gestione errore interno server 500
app.use(errorsHandler);



//Start the server lsitener
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
