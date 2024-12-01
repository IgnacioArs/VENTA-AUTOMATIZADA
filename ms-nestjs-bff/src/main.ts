import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registra el interceptor globalmente
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Obtener la instancia de ConfigService
  const configService = app.get(ConfigService);
  console.log("MOSTRANDO PORT BFF",configService.get<number>('port'));
  console.log("MOSTRANDO CORS BFF",configService.get<string>('cors'));
  console.log("MOSTRANDO SECRET BFF",configService.get<string>('secret'));
  console.log("MOSTRANDO MSSECURITY BFF",configService.get<string>('msSecurity'));
  console.log("MOSTRANDO MSPYTHON BFF",configService.get<string>('msPython'));
    
    
  // Configuración de CORS
  app.enableCors({
    origin: configService.get<string>('cors'), // Permite todas las solicitudes en desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Permitir cookies y autenticación
  });

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('BFF API')
    .setDescription('Documentación de la API de BFF')
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación con Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/nestjs', app, document);

  // Obtener el puerto desde la configuración o usar el predeterminado 
  const port = configService.get<number>('port');

  await app.listen(port);

  console.clear(); // Limpia la consola para destacar el mensaje de inicio
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
