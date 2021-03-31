import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index(): string {
    return '<html><body><script src="client.js"></script></body></html>';
  }
}
