//Importamos express
import express from 'express';

//Importamos router
import cartsRoutes from './src/routes/carts.routes.js';
import productsRoutes from './src/routes/products.routes.js';

//Importamos utils
import __dirname from './src/config/utils.js';

//Creamos una instancia de express
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuramos el servidor para servir archivos estaticos
app.use(express.static(__dirname + '/src/public'));

//Configuramos el puerto
const PORT = 8080;

//Configuramos las rutas
app.use('/api/carts', cartsRoutes);
app.use('/api/products', productsRoutes);

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
    console.log(`Path: ${__dirname}`)
});