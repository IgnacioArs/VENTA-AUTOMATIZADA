"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const configService = app.get(config_1.ConfigService);
    console.log("MOSTRANDO PORT BFF", configService.get('port'));
    console.log("MOSTRANDO CORS BFF", configService.get('cors'));
    console.log("MOSTRANDO SECRET BFF", configService.get('secret'));
    console.log("MOSTRANDO MSSECURITY BFF", configService.get('msSecurity'));
    console.log("MOSTRANDO MSPYTHON BFF", configService.get('msPython'));
    app.enableCors({
        origin: configService.get('cors'),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('BFF API')
        .setDescription('Documentación de la API de BFF')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/nestjs', app, document);
    const port = configService.get('port');
    await app.listen(port);
    console.clear();
    console.log(`██████████████████████████████████████████████████████████████████`);
    console.log(`██**************************************************************██`);
    console.log(`██**************************************************************██`);
    console.log(`   SECURITY application is running at: http://localhost:${port}   `);
    console.log(`   Swagger Docs available at: http://localhost:${port}/api/nestjs   `);
    console.log(`██**************************************************************██`);
    console.log(`██**************************************************************██`);
    console.log(`██████████████████████████████████████████████████████████████████`);
}
bootstrap();
//# sourceMappingURL=main.js.map