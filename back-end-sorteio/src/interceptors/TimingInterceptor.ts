import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const elapsed = Date.now() - now;

        // Você pode modificar o response aqui se quiser incluir o tempo
        const response = context.switchToHttp().getResponse();

        // Se for JSON, injeta no body
        if (response && typeof data === 'object') {
          response.json({
            ...data,
            durationMs: elapsed,
          });
        }
      }),
    );
  }
}
