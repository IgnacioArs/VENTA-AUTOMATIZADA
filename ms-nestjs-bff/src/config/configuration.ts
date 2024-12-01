export default () => ({
    port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.PORT_PRODUCCION, 10) : parseInt(process.env.PORT_DESARROLLO, 10),
    cors:process.env.ENTORNO_ENV ==='produccion'? process.env.CORS_ORIGIN_PRODUCCION : process.env.CORS_ORIGIN_DESARROLLO,
    secret:process.env.JWT_SECRET,
    msSecurity:process.env.ENTORNO_ENV ==='produccion'? process.env.MS_SECURITY_ORIGIN_PRODUCCION: process.env.MS_SECURITY_ORIGIN_DESARROLLO,
    msPython:process.env.ENTORNO_ENV ==='produccion'? process.env.MS_PYTHON_ORIGIN_PRODUCCION: process.env.MS_PYTHON_ORIGIN_DESARROLLO
  });
