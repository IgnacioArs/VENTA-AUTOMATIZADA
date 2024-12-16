export default () => ({
  port:3001,
  cors:'http://localhost:3002',
  secret:process.env.JWT_SECRET,
  database: {
    host:'localhost'  ,
    port:5432,
    username:'admin',
    password:'admin',
    name:'proyecto',
  }
});


/* export default () => ({
    port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.PORT_PRODUCCION, 10) : parseInt(process.env.PORT_DESARROLLO, 10) || 3001,
    cors:process.env.ENTORNO_ENV ==='produccion'? process.env.CORS_ORIGIN_PRODUCCION : process.env.CORS_ORIGIN_DESARROLLO || 'http://localhost:3002',
    secret:process.env.JWT_SECRET,
    database: {
      host: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_HOST_PRODUCCION : process.env.DB_HOST_DESARROLLO || 'localhost'  ,
      port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.DB_PORT_PRODUCCION) : parseInt(process.env.DB_PORT_DESARROLLO) || 5432,
      username: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_USERNAME_PRODUCCION : process.env.DB_USERNAME_DESARROLLO || 'admin',
      password: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_PASSWORD_PRODUCCION : process.env.DB_PASSWORD_DESARROLLO || 'admin',
      name: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_NAME_PRODUCCION : process.env.DB_NAME_DESARROLLO || 'proyecto',
    }
  }); */
  

  /* export default () => ({
    port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.PORT_PRODUCCION, 10) : parseInt(process.env.PORT_DESARROLLO, 10) || 3001,
    cors:process.env.ENTORNO_ENV ==='produccion'? process.env.CORS_ORIGIN_PRODUCCION : process.env.CORS_ORIGIN_DESARROLLO || 'http://localhost:3002',
    secret:process.env.JWT_SECRET,
    database: {
      host: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_HOST_PRODUCCION : process.env.DB_HOST_DESARROLLO || 'localhost'  ,
      port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.DB_PORT_PRODUCCION) : parseInt(process.env.DB_PORT_DESARROLLO) || 5432,
      username: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_USERNAME_PRODUCCION : process.env.DB_USERNAME_DESARROLLO || 'admin',
      password: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_PASSWORD_PRODUCCION : process.env.DB_PASSWORD_DESARROLLO || 'admin',
      name: process.env.ENTORNO_ENV ==='produccion'? process.env.DB_NAME_PRODUCCION : process.env.DB_NAME_DESARROLLO || 'proyecto',
    }
  }); */