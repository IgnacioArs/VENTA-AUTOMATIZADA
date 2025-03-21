import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService){}
  getHello(): string {
    const port = this.configService.get<number>('port');
    /* return 'Hello World! SERVER RUNNING PORT:'+`${port? port:3002}`; */
    return 'Hello World!';
  }
}
