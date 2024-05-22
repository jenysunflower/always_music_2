import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;
import Conexion from "./claseConexion.js";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

// Realizo el control de los métodos en base al comando ingresado por consola a partir del siguiente código:
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`;

const config = {
  connectionString: connectionString,
  idleTimeoutMillis: 0,
  allowExitOnIdle: true,
};
const connection_pool = new Pool(config);

const arrayComandos = process.argv.slice(2);

const conexion_data_base = new Conexion(arrayComandos, connection_pool);

const acciones = {
  nuevo: conexion_data_base.ingresarEstudiante.bind(conexion_data_base),
  rut: conexion_data_base.consultarPorRut.bind(conexion_data_base),
  consulta:
    conexion_data_base.consultarTodosLosEstudiantes.bind(conexion_data_base),
  editar: conexion_data_base.editarEstudiante.bind(conexion_data_base),
  eliminar:
    conexion_data_base.eliminarEstudiantePorRut.bind(conexion_data_base),
};

if (arrayComandos[0]) {
  if (acciones[arrayComandos[0]]) {
    acciones[arrayComandos[0]]();
  } else {
    console.log("Comando inválido");
  }
} else {
  console.log("Debes ingresar un comando");
}
