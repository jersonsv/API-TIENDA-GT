import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('GDA00482OTJersonSalvador','sa', 'Sqlserver3.0',{
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
        options: {
            encrypt: true, // conexión segura
            trustServerCertificate: true, // certificados autofirmados
            requestTimeout: 60000,  // Timeout
        }
    }
  });

/* async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log("Conexión establecida exitosamente!!")
    }catch(err) {
        console.error("No se pudo conectar a la base de datos:", err)
    }
}*/

export default sequelize;
