import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller'
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, AuthService],
  imports: [AuthModule]
})
export class PaymentModule {}
