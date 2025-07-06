import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/payment.entity";
import { SalesService } from "../sales/sales.service";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private readonly salesService: SalesService
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    await this.salesService.findOne(createPaymentDto.sale_id);
    const payment = this.paymentsRepository.create(createPaymentDto);

    return this.paymentsRepository.save(payment);
  }

  async findAll() {
    const payments = await this.paymentsRepository.find();
    if (payments.length === 0) {
      throw new NotFoundException("No payments found.");
    }
    return payments;
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    const { sale_id } = updatePaymentDto;
    if (sale_id) await this.salesService.findOne(sale_id);
    await this.paymentsRepository.update(id, updatePaymentDto);

    return payment;
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentsRepository.delete(id);

    return payment;
  }
}
