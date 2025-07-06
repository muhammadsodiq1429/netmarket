import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'The payment has been successfully created.', type: Payment })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const newPayment = await this.paymentsService.create(createPaymentDto);
    return { statusCode: 201, message: "Payment created successfully", newPayment };
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Return all payments.', type: [Payment] })
  async findAll() {
    const payments = await this.paymentsService.findAll();
    return { statusCode: 200, message: "Payments retrieved successfully", payments };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiResponse({ status: 200, description: 'Return a single payment.', type: Payment })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const payment = await this.paymentsService.findOne(id);
    return { statusCode: 200, message: "Payment retrieved successfully", payment };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiResponse({ status: 200, description: 'The payment has been successfully updated.', type: Payment })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    const updatedPayment = await this.paymentsService.update(id, updatePaymentDto);
    return { statusCode: 200, message: "Payment updated successfully", updatedPayment };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({ status: 200, description: 'The payment has been successfully deleted.', type: Payment })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedPayment = await this.paymentsService.remove(id);
    return { statusCode: 200, message: "Payment deleted successfully", deletedPayment };
  }
}