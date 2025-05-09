// Guarda este archivo como direct-test.js
const mysql = require('mysql2');

// Configuración directa sin usar dotenv
const config = {
  host: 'localhost',
  user: 'root',
  password: 'ProyectoSe2069',
  database: 'click&connect',
  port: 3307
};

console.log('Intentando conexión con la siguiente configuración:');
console.log(config);

// Crear conexión
const connection = mysql.createConnection(config);

// Intentar conectar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar:', err.message);
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\nError de acceso denegado. Posibles causas:');
      console.log('1. La contraseña o usuario son incorrectos');
      console.log('2. El usuario no tiene permisos suficientes');
    }
    
    if (err.code === 'ECONNREFUSED') {
      console.log('\nConexión rechazada. Posibles causas:');
      console.log('1. MySQL no está ejecutándose en el puerto especificado');
      console.log('2. Hay un firewall bloqueando la conexión');
      console.log('3. La dirección del host es incorrecta');
    }
    
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('\nBase de datos no encontrada. Posibles causas:');
      console.log('1. La base de datos no existe');
      console.log('2. El nombre de la base de datos está mal escrito');
      console.log('3. El usuario no tiene acceso a esta base de datos');
    }
    
    process.exit(1);
  }
  
  console.log('✅ Conexión exitosa a MySQL!');
  
  // Ejecutar una consulta simple
  connection.query('SELECT * FROM articulo LIMIT 1', (queryErr, results) => {
    if (queryErr) {
      console.error('Error en la consulta:', queryErr.message);
    } else {
      console.log('Resultado de la consulta:');
      console.log(results);
    }
    
    // Cerrar la conexión
    connection.end();
  });
});