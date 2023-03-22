//Importamos modulos
import { fileURLToPath } from "url";
import { dirname } from "path";

//Creamos variables para obtener el directorio actual y el nombre del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Exportamos el directorio actual
export default __dirname;