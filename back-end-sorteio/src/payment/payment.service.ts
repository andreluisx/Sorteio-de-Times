import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';



@Injectable()
export class PaymentService {
  async create(createPaymentDto: CreatePaymentDto) {
    return createPaymentDto
  }
}
