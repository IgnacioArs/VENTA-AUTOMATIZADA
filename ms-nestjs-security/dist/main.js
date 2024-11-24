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
    console.log("MOSTRANDO PORT SECURITY", configService.get('port'));
    console.log("MOSTRANDO CORS SECURITY", configService.get('cors'));
    console.log("MOSTRANDO SECRET SECURITY", configService.get('secret'));
    console.log("MOSTRANDO HOST DATABASE SECURITY", configService.get('database.host'));
    console.log("MOSTRANDO PORT DATABASE SECURITY", configService.get('database.port'));
    console.log("MOSTRANDO USERNAME DATABASE SECURITY", configService.get('database.username'));
    console.log("MOSTRANDO PASSWORD DATABASE SECURITY", configService.get('database.password'));
    console.log("MOSTRANDO NAME DATABASE SECURITY", configService.get('database.name'));
    app.enableCors({
        origin: configService.get('cors'),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('SECURITY API')
        .setDescription('Documentación de la API de SECURITY')
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