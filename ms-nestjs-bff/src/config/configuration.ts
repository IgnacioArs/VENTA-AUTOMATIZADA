export default () => ({                                                                            // SI NO ES DESARROLLO O PRODUCCION                                            
    port:3002,
    cors:'http://localhost:3003',
    secret:process.env.JWT_SECRET,
    msSecurity:'http://localhost:3001' ,
    msPython:'http://localhost:3000'
}); 

/* export default () => ({                                                                            // SI NO ES DESARROLLO O PRODUCCION                                            
    port: process.env.ENTORNO_ENV ==='produccion'? parseInt(process.env.PORT_PRODUCCION, 10) : parseInt(process.env.PORT_DESARROLLO, 10) || 3002,
    cors:process.env.ENTORNO_ENV ==='produccion'? process.env.CORS_ORIGIN_PRODUCCION : process.env.CORS_ORIGIN_DESARROLLO || 'http://localhost:3003',
    secret:process.env.JWT_SECRET,
    msSecurity:process.env.ENTORNO_ENV ==='produccion'? process.env.MS_SECURITY_ORIGIN_PRODUCCION: process.env.MS_SECURITY_ORIGIN_DESARROLLO || 'http://localhost:3001' ,
    msPython:process.env.ENTORNO_ENV ==='produccion'? process.env.MS_PYTHON_ORIGIN_PRODUCCION: process.env.MS_PYTHON_ORIGIN_DESARROLLO || 'http://localhost:3000'
}); */
