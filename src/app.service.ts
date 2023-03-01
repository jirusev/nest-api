import { Injectable } from '@nestjs/common';

// Logic goes in the Service class

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
