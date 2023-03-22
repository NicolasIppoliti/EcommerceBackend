//FileSystem Async

//Importo el modulo de FileSystem
import fs from 'fs';

//Importo el modulo de Path
import path from 'path';

//Constante path
const __dirname = path.resolve();

//Creamos la clase para el manejo de archivos
class ProductsHandler {
    constructor(filename) {
        this.filename = __dirname + filename;
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

    //Defino metodos para agregar y eliminar productos
    async addProduct(product) {
        try {
            //Leemos el archivo de productos
            const data = await this.readFile();
            console.log("Archivo de productos leido.");
            console.log(data);
            //Agregamos el producto al array
            data.push(product);
            //Escribimos el archivo de productos
            await this.writeFile(data);
            console.log("Archivo de productos actualizado.");
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteProduct(pid) {
        try {
            //Leemos el archivo de productos
            const data = await this.readFile();
            console.log("Archivo de productos leido.");
            console.log(data);
            //Buscamos el producto por id
            const productPosition = data.findIndex((p => p.id === pid));
            if (productPosition < 0) {
                return { status: "info", error: "Producto no encontrado" };
            }
            //Eliminamos el producto del array
            data.splice(productPosition, 1);
            //Escribimos el archivo de productos
            await this.writeFile(data);
            console.log("Archivo de productos actualizado.");
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Defino metodos para actualizar productos
    async updateProduct(pid, product) {
        try {
            //Leemos el archivo de productos
            const data = await this.readFile();
            console.log("Archivo de productos leido.");
            console.log(data);
            //Buscamos el producto por id
            const productPosition = data.findIndex((p => p.id === pid));
            if (productPosition < 0) {
                return { status: "info", error: "Producto no encontrado" };
            }
            //Actualizamos el producto del array
            data[productPosition] = product;
            //Escribimos el archivo de productos
            await this.writeFile(data);
            console.log("Archivo de productos actualizado.");
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Defino metodos para listar productos
    async listProducts() {
        try {
            //Leemos el archivo de productos
            const data = await this.readFile();
            console.log("Archivo de productos leido.");
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    //Defino metodos para listar un producto
    async listProduct(pid) {
        try {
            //Leemos el archivo de productos
            const data = await this.readFile();
            console.log("Archivo de productos leido.");
            console.log(data);
            //Buscamos el producto por id
            const productPosition = data.findIndex((p => p.id === pid));
            if (productPosition < 0) {
                return { status: "info", error: "Producto no encontrado" };
            }
            //Retornamos el producto
            return data[productPosition];
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

//Exporto la clase
export default ProductsHandler;

// Path: src\services\fsAsyncProducts.js