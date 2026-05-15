import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = (req.headers['x-user-id'] as string) || 'ANONYMOUS';
    //Lee el userId del header, si no existe, lo marca como ANONYMOUS.

    console.log(
      `[User: ${userId}] accedió a ${req.originalUrl} - ${req.method}`,
    );

    next();
    // Continúa al controller.
  }
}
