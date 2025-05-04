import {
  ExecutionContext,
  Inject,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class LoggingCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    reflector: Reflector
  ) {
    super(cacheManager, reflector);
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const key = this.trackBy(context);
    
    if (!key) {
      return next.handle();
    }
    
    try {
      const value = await this.cacheManager.get(key);
      
      if (value) {
        console.log(`✅ Cache HIT for key: ${key}`);
        return of(value);
      }
      
      console.log(`❌ Cache MISS for key: ${key}`);
      
      return next.handle().pipe(
        tap(response => {
          const ttl = this.getTtl(context);
          this.cacheManager.set(key, response, ttl).then(() => {
            console.log(`💾 Saved to cache: ${key} (TTL: ${ttl}ms)`);
          }).catch(error => {
            console.error(`Failed to cache: ${key}`, error);
          });
        })
      );
    } catch (error) {
      console.error(`Error with cache for key ${key}:`, error);
      return next.handle();
    }
  }
  
  protected getTtl(context: ExecutionContext): number {
    // Você pode definir um TTL padrão aqui ou usar o do decorator @CacheKey
    // Vou definir um padrão de 30 segundos
    return 30000;
  }
}