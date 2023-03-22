//Importamos router
import { Router } from 'express';

//Importamos fsAsyncCarts
import CartsHandler from '../services/fsAsyncCarts.js';

//Importamos JSON de productos
import product from '../services/data/products.json' assert { type: 'json' };

//Creamos una instancia de CartsHandler
const cartsHandler = new CartsHandler('/src/services/data/carts.json');

//Creamos una instancia de router
const router = Router();

//Metodo POST async de un carrito de compras
router.post('/', async (request, response) => {
    let cart = request.body;
    cart.id = Number(Math.floor(Math.random() * 20 + 1));
    if (!Array(cart.products)) {
        console.error("Carrito de compras no valido.");
        console.error(cart);
        response.status(400).send({ status: "Error", message: "Carrito de compras invalido, verifique los datos de entrada." });
    } else {
        try {
            const data = await cartsHandler.addCarts(cart);
            console.log(data);
            response.send({ status: "Success", message: `Carrito de compras agregado con exito, con ID: ${cart.id}` });
        } catch (error) {
            console.error(error);
            response.status(500).send({ status: "Error", message: "Error al agregar el carrito de compras." });
        }
    }
});

//Metodo GET async de un carrito de compras
router.get('/:cid', async (request, response) => {
    console.log('Consumiendo api GET /api/carts/:cid..');
    console.log(request.params);
    let cid = parseInt(request.params.cid);
    console.log(`Buscando carrito de compras por id: ${cid}`);
    try {
        const data = await cartsHandler.readFile();
        console.log("Archivo de carritos leido.");
        console.log(data);
        const cart = data.find(cart => cart.id == cid);
        if (cart) {
            console.log("Carrito de compras encontrado:");
            console.log(cart);
            return response.send({ status: "Success", message: "Carrito de compras encontrado.", data: cart });
        } else {
            return response.status(202).send({ status: "info", error: "Carrito de compras no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send({ status: "Error", message: "Error al buscar el carrito de compras." });
    }
});

//Metodo POST async de un producto dentro de un carrito de compras
router.post('/:cid/product/:pid', async (request, response) => {
    console.log('Consumiendo api POST /api/carts/:cid/product/:pid..');
    console.log(request.params);
    let cid = parseInt(request.params.cid);
    let pid = parseInt(request.params.pid);
    console.log(`Buscando carrito de compras por id: ${cid}`);
    try {
        const data = await cartsHandler.readFile();
        console.log("Archivo de carritos leido.");
        console.log(data);
        const cartPosition = data.findIndex((c => c.id === cid));
        if (cartPosition < 0) {
            return response.status(202).send({ status: "info", error: "Carrito de compras no encontrado" });
        }
        console.log("Carrito de compras encontrado:");
        console.log(data[cartPosition]);
        console.log(`Buscando producto por id: ${pid}`);
        const productPosition = product.findIndex((p => p.id === pid));
        if (productPosition < 0) {
            return response.status(202).send({ status: "info", error: "Producto no encontrado" });
        }
        console.log("Producto encontrado:");
        console.log(product[productPosition]);
        //Agregamos el producto al carrito
        cartsHandler.addProduct(data[cartPosition], product[productPosition]);
        console.log("Producto agregado al carrito de compras.");
        console.log(data[cartPosition]);
        //Guardamos el carrito de compras
        cartsHandler.writeFile(data);
        console.log("Carrito de compras guardado.");
        return response.send({ status: "Success", message: "Producto agregado al carrito de compras.", data: data[cartPosition] });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ status: "Error", message: "Error al buscar el carrito de compras." });
    }
});

//Exportamos el modulo
export default router;