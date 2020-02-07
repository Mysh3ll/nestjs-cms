import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

const AUTHOR = 'Mysh3ll';

@Injectable()
export class CheckauthorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { author } = request.body;
    if (!author) {
      request.body.author = AUTHOR;
    }
    return next.handle();
  }
}
