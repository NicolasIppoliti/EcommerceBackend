//FileSystem Async

//Importo el modulo de FileSystem
import fs from 'fs';
import util from 'util';

// Convierte fs.readFile en una función que retorna una promesa
const readFileProduct = util.promisify(fs.readFile);

//Importo el modulo de Path
import path from 'path';

//Constante path
const __dirname = path.resolve();

//Creamos la clase para el manejo de archivos
class CartsHandler {
    constructor(filename) {
        this.filename = __dirname + filename;
        this.init();
    }

    //Defino metodos para leer y escribir el archivo
    async readFile() {
        try {
            // Leer el archivo usando la versión de promesas y asignar el resultado a 'data'
            const data = await fs.promises.readFile(this.filename, 'utf-8');
            
            // Devolver el resultado de parsear 'data' como JSON
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(data, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    }

    //Defino metodo para inicializar el archivo
    async init() {
        try {
            //Leemos el archivo
            const data = await readFileProduct(__dirname + '/src/services/data/products.json', 'utf-8');
            console.log("Archivo de productos leido.");

            // Convertimos la información del archivo en un objeto JavaScript
            this.products = JSON.parse(data);
            console.log("Archivo de productos convertido a objeto.");

            } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            }
    }

    //Defino metodos para agregar y eliminar carritos
    async addCarts(cart) {
        try {
            //Leemos el archivo de carritos
            const data = await this.readFile();
            console.log("Archivo de carritos leido.");
            console.log(data);
            //Agregamos el carrito al array
            data.push(cart);
            //Escribimos el archivo de carritos
            await this.writeFile(data);
            console.log("Archivo de carritos actualizado.");
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Defino metodos para listar productos de un carrito
    async listProducts(cartId) {
        try {
            //Leemos el archivo de carritos
            const data = await this.readFile();
            console.log("Archivo de carritos leido.");
            console.log(data);
            //Buscamos el carrito
            const cart = data.find(cart => cart.id == cartId);
            //Retornamos los productos del carrito
            return cart.products;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Defino metodos para agregar productos a un carrito
    async addProduct(cartId, product) {
        try {
            //Leemos el archivo de carritos
            const data = await this.readFile();
            console.log("Archivo de carritos leido.");
            console.log(data);
            //Buscamos el carrito
            const cart = data.find(cart => cart.id == cartId);
            //Buscamos el producto
            const productFound = this.products.find(prod => prod.id == product.id);
            //Creamos propiedad quantity en el producto si no existe
            if (!productFound.quantity) {
                productFound.quantity = 0;
            }
            //Aumentamos la cantidad del producto
            productFound.quantity += product.quantity;
            //Agregamos el producto al carrito
            cart.products.push(productFound);
            //Escribimos el archivo de carritos
            await this.writeFile(data);
            console.log("Archivo de carritos actualizado.");
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

//Exporto la clase
export default CartsHandler;