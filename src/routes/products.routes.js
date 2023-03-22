//Importamos router
import { Router } from 'express';

//Importamos fsAsyncProducts
import ProductsHandler from '../services/fsAsyncProducts.js';

//Creamos una instancia de ProductsHandler
const productsHandler = new ProductsHandler('/src/services/data/products.json');

//Creamos una instancia de router
const router = Router();

//Metodo GET async por default:
router.get('/', async (request, response) => {
    console.log("Consumiendo api GET /api/products..");
    const products = await productsHandler.listProducts();
    console.log(products);
    response.send({ status: "Success", message: "Productos encontrados.", data: products });
});

//Metodo GET async por id:
router.get('/:id', async (request, response) => {
    console.log("Consumiendo api GET /api/products/:id..");
    console.log(request.params);
    const id = parseInt(request.params.id);
    console.log(`Buscando producto por id: ${id}`);
    const product = await productsHandler.listProduct(id);
    if (!product.id) {
        return response.status(202).send({ status: "info", error: "Producto no encontrado" });
    }
    console.log("Producto encontrado:");
    console.log(product);
    return response.send({ status: "Success", message: "Producto encontrado.", data: product }); //Si no se indica retorna status HTTP 200OK.
});

//Metodo POST async de un producto
router.post('/', async (request, response) => {
    console.log("Consumiendo api POST /api/products..");
    console.log(request.body);
    let product = request.body;
    product.id = Number(Math.floor(Math.random() * 20 + 1));
    if (!String(product.title) || !String(product.description) || !String(product.code) || !Number(product.price) || !Boolean(product.status) || !Number(product.stock) || !String(product.category) || !Array(product.thumbnail)) {
        console.error("Producto no valido.");
        console.error(product);
        response.status(400).send({ status: "Error", message: "Producto invalido, verifique los datos de entrada." });
    } else {
        await productsHandler.addProduct(product);
        console.log(product);
        response.send({ status: "Success", message: `Producto agregado con exito, con ID: ${product.id}` });
    }
});

//Metodo PUT async de un producto
router.put('/:id', async (request, response) => {
    console.log("Consumiendo api PUT /api/products/:id..");
    console.log(request.params);
    const id = parseInt(request.params.id);
    console.log(`Buscando producto por id: ${id}`);
    const product = await productsHandler.listProduct(id);
    if (!product) {
        return response.status(202).send({ status: "info", error: "Producto no encontrado" });
    }
    console.log("Producto encontrado:");
    console.log(product);
    let productUpdated = request.body;
    productUpdated.id = id;
    if (!String(productUpdated.title) || !String(productUpdated.description) || !String(productUpdated.code) || !Number(productUpdated.price) || !Boolean(productUpdated.status) || !Number(productUpdated.stock) || !String(productUpdated.category) || !Array(productUpdated.thumbnail)) {
        console.error("Producto no valido.");
        console.error(productUpdated);
        response.status(400).send({ status: "Error", message: "Producto invalido, verifique los datos de entrada." });
    } else {
        await productsHandler.updateProduct(id, productUpdated);
        console.log(productUpdated);
        response.send({ status: "Success", message: `Producto actualizado con exito, con ID: ${productUpdated.id}` });
    }
});

//Metodo DELETE async de un producto
router.delete('/:id', async (request, response) => {
    console.log("Consumiendo api DELETE /api/products/:id..");
    console.log(request.params);
    const id = parseInt(request.params.id);
    console.log(`Buscando producto por id: ${id}`);
    const product = await productsHandler.listProduct(id);
    if (!product) {
        return response.status(202).send({ status: "info", error: "Producto no encontrado" });
    }
    console.log("Producto encontrado:");
    console.log(product);
    await productsHandler.deleteProduct(id);
    response.send({ status: "Success", message: `Producto eliminado con exito, con ID: ${id}` });
});

//Exportamos el modulo
export default router;