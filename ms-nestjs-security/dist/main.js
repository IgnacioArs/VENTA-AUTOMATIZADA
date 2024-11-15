"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
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
    const port = configService.get('port') || 3000;
    await app.listen(port);
    console.clear();
    console.log(`██████████████████████████████████████████████████████████████████`);
    console.log(`██**************************************************************██`);
    console.log(`██**************************************************************██`);
    console.log(`   SECURITY application is running at: http://localhost:${port}   `);
    console.log(`   Swagger Docs available at: http://localhost:${port}/api-docs   `);
    console.log(`██**************************************************************██`);
    console.log(`██**************************************************************██`);
    console.log(`██████████████████████████████████████████████████████████████████`);
}
bootstrap();
//# sourceMappingURL=main.js.map