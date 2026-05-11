import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    setTimeout(next, 2000);
  }
}
