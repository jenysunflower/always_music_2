// Soluciones
// 1.Hacer todas las consultas con un JSON como argumento del método query.(2 Puntos)
// 2.Hacer las consultas con texto parametrizado.(3 Puntos)
// 3.Capturar los posibles errores en todas las consultas e imprimirlos por consola.(3 Puntos)
// 4.Obtener el registro de los estudiantes registrados en formato de arreglos. (3 Puntos)
// A continuación muestro la clase que he creado en la cual incorporo los requisitos pedidos. 
// Como se puede observar en los 5 métodos asíncronos ingresarEstudiante, consultarPorRut, consultarTodosLosEstudiantes, 
// editarEstudiante y eliminarEstudiantePorRut realizo las consultas con un objeto query, las consultas estan parametrizadas, 
// capturo los errores mediante uso del bloque try y catch, y muestro data en forma de array cuando consulto a la base de datos.

export default class Conexion {
  constructor(arrayComandos, pool) {
    this.arrayComandos = arrayComandos;
    this.pool = pool;
  }

  ingresarEstudiante = async () => {
    const argumentosData = this.arrayComandos.slice(1);

    if (argumentosData.length === 4) {
      const estudiante = {
        nombre: argumentosData[0],
        rut: argumentosData[1],
        curso: argumentosData[2],
        nivel: argumentosData[3],
      };

      try {
        const query = {
          text: "insert into estudiantes (nombre,rut,curso,nivel) values ($1, $2,$3, $4)",
          values: [
            estudiante.nombre,
            estudiante.rut,
            estudiante.curso,
            estudiante.nivel,
          ],
        };

        const response = await this.pool.query(query);

        if (response.rowCount == 1) {
          console.log(`Estudiante ${estudiante.nombre} insertado con éxito`);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log(
        `Falta(n) los siguientes parámetros: ${
          argumentosData[0] ? "" : "nombre,"
        } ${argumentosData[1] ? "" : "rut,"} ${
          argumentosData[2] ? "" : "curso,"
        } ${argumentosData[3] ? "" : "nivel"}`,
      );
    }
  };

  consultarPorRut = async () => {
    const argumentosData = this.arrayComandos.slice(1);
    if (argumentosData[0]) {
      const rut = argumentosData[0];
      try {
        const query = {
          text: "select * from estudiantes where rut = $1",
          values: [rut],
          rowMode: "array",
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        } else {
          console.log(response.rows);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log("Debes ingresar un rut");
    }
  };

  consultarTodosLosEstudiantes = async () => {
    try {
      const response = await this.pool.query({
        text: "select * from estudiantes",
        rowMode: "array",
      });
      if (response.rowCount == 0) {
        console.log("Estudiantes no encontrados");
      } else {
        console.log(response.rows);
      }
    } catch (error) {
      console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
    }
  };

  editarEstudiante = async () => {
    const argumentosData = this.arrayComandos.slice(1);

    if (argumentosData.length === 4) {
      const estudiante = {
        nombre: argumentosData[0],
        rut: argumentosData[1],
        curso: argumentosData[2],
        nivel: argumentosData[3],
      };

      try {
        const query = {
          text: "update estudiantes set nombre=$1, rut=$2, curso=$3, nivel=$4 where rut=$2",
          values: [
            estudiante.nombre,
            estudiante.rut,
            estudiante.curso,
            estudiante.nivel,
          ],
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 1) {
          console.log(`Estudiante ${estudiante.nombre} modificado con éxito`);
        }
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log(
        `Falta(n) los siguientes parámetros: ${
          argumentosData[0] ? "" : "nombre,"
        } ${argumentosData[1] ? "" : "rut,"} ${
          argumentosData[2] ? "" : "curso,"
        } ${argumentosData[3] ? "" : "nivel"}`,
      );
    }
  };

  eliminarEstudiantePorRut = async () => {
    const argumentosData = this.arrayComandos.slice(1);
    if (argumentosData[0]) {
      const rut = argumentosData[0];
      try {
        const query = {
          text: "delete from estudiantes where rut = $1",
          values: [rut],
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        }
        if (response.rowCount == 1) {
          console.log(`Estudiante con rut ${rut} eliminado con éxito`);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log("Debes ingresar un rut");
    }
  };
}
